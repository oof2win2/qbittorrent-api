# @oof2win2/qbittorrent-api

A TypeScript wrapper for the qBittorrent [WebUI API (v5.0)](https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-5.0)).

API methods within this wrapper mirror the API methods for qBitTorrent itself.

## Quick Start

```ts
import { createQBittorrentClient } from "@oof2win2/qbittorrent-api";

const client = createQBittorrentClient({
  url: "http://localhost:8080",
  username: "admin",
  password: "adminadmin",
});

// Authentication happens automatically on the first API call.
// You can also call client.auth.login() explicitly.
const torrents = await client.torrents.list({ filter: "downloading" });
console.log(torrents);
```

## Authentication

Authentication is handled automatically. On the first API call, the client logs in and stores the session cookie. If the session expires (403), it re-authenticates transparently.

```ts
// Explicit login/logout
await client.auth.login();
await client.auth.logout();
```

## Modules

API methods mirror the layout and parameters of the API itself.

| Module     | Description |
|------------|-------------|
| `auth`     | Login/logout |
| `app`      | Version, build info, preferences, cookies, shutdown |
| `log`      | Main log, peer log |
| `sync`     | Main data sync, torrent peers sync |
| `transfer` | Global transfer info, speed limits, ban peers |
| `torrents` | Full torrent management (CRUD, priorities, categories, tags, files) |
