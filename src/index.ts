import type { QBittorrentClient, QBittorrentClientConfig } from "./types.ts";
import { createHttpClient } from "./client.ts";
import { createAuthModule } from "./modules/auth.ts";
import { createAppModule } from "./modules/app.ts";
import { createLogModule } from "./modules/log.ts";
import { createSyncModule } from "./modules/sync.ts";
import { createTransferModule } from "./modules/transfer.ts";
import { createTorrentsModule } from "./modules/torrents.ts";

export function createQBittorrentClient(
  config: QBittorrentClientConfig,
): QBittorrentClient {
  const http = createHttpClient(config);

  return {
    auth: createAuthModule(http, config.username, config.password),
    app: createAppModule(http),
    log: createLogModule(http),
    sync: createSyncModule(http),
    transfer: createTransferModule(http),
    torrents: createTorrentsModule(http),
  };
}

export type { QBittorrentClient, QBittorrentClientConfig } from "./types.ts";
export * from "./types.ts";
