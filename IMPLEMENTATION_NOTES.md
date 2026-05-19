# qBittorrent API Wrapper - Implementation Notes

## Architecture

```
src/
  index.ts          — Entry point, exports `createQBittorrentClient` and all types
  types.ts          — Zod schemas + TypeScript interfaces for all modules
  utils.ts          — normalizeHashes, normalizeList helpers
  client.ts         — Got HTTP client with lazy auth via hooks
  modules/
    auth.ts         — Manual login/logout
    app.ts          — Application info, preferences, cookies
    log.ts          — Main log, peer log
    sync.ts         — Maindata sync, torrent peers sync
    transfer.ts     — Global transfer info, speed limits, ban peers
    torrents.ts     — Full torrent management (CRUD, priorities, categories, tags, etc.)
```

## Auth Flow

- **Cookie management**: Uses `got`'s built-in `cookieJar` (backed by `tough-cookie`). Login response's `Set-Cookie: SID=...` is stored automatically — no manual cookie extraction.
- **Lazy login**: The `beforeRequest` hook checks an `authenticated` flag. If false, it calls `client.post('auth/login')`. The cookie jar stores the SID. After login, the cookie header is refreshed from the jar for the current request.
- **Re-entrant guard**: An `authenticating` flag prevents infinite loops — the login request itself goes through the same hooks but returns early.
- **Auto-reauth on 403**: The `afterResponse` hook detects 403 responses, clears `authenticated`, and retries via `retryWithMergedOptions`. On retry, `beforeRequest` sees `authenticated === false` and re-authenticates.
- **Manual auth**: `client.auth.login()` and `client.auth.logout()` are exposed for explicit control.

## HTTP Library

- Uses `got` (v15) with `got.extend()` to create an instance with defaults.
- `prefixUrl` set to `{url}/api/v2/` so module methods only pass relative paths like `torrents/info`.
- `Referer` header set automatically (required by qBittorrent CSRF protection).
- Retry disabled (`limit: 0`) except for the manual 403 re-auth via `afterResponse`.

## Validation

- All response types validated at runtime using Zod v4 schemas.
- Schemas defined in `types.ts` alongside inferred TypeScript types.
- Response schemas use `.passthrough()` where the API may return extra fields.

## Hashes/Lists Convention

- qBittorrent uses `|`-separated hashes and `|`-separated peers.
- Tags use `,` as separator.
- Categories use `\n` as separator.
- The `normalizeHashes()` and `normalizeList()` utilities handle both `string` and `string[]` inputs.

## Key Design Decisions

1. **Module factory pattern**: Each module is `createXxxModule(http: Got)` returning a plain object of async functions.
2. **No classes**: Plain objects and closures, as requested.
3. **FormData for torrent upload**: The `torrents.add()` method builds a `FormData` object for multipart upload.
4. **Cookie handling via got**: Uses `got`'s `cookieJar` with `tough-cookie` — no manual cookie management.

## Usage

```ts
import { createQBittorrentClient } from "qbittorrent-api";

const client = createQBittorrentClient({
  url: "http://localhost:8080",
  username: "admin",
  password: "adminadmin",
});

// Auth happens automatically on first API call
const torrents = await client.torrents.list({ filter: "downloading" });
const version = await client.app.getVersion();
await client.torrents.stop(["hash1", "hash2"]);
```

## Modules Coverage

| Module   | Endpoints | Notes |
|----------|-----------|-------|
| auth     | 2         | login, logout |
| app      | 9         | version, buildInfo, preferences, cookies, shutdown |
| log      | 2         | main log, peer log |
| sync     | 2         | maindata, torrent peers |
| transfer | 7         | global info, speed limits, ban peers |
| torrents | 40+       | full CRUD, priorities, categories, tags, file ops |
