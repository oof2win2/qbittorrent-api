import type { Got } from "got";
import type { SyncModule, MainDataResponse, TorrentPeersResponse } from "../types.ts";
import { MainDataResponseSchema, TorrentPeersResponseSchema } from "../types.ts";

export function createSyncModule(http: Got): SyncModule {
  return {
    async getMainData(rid?: number): Promise<MainDataResponse> {
      const body = await http
        .get("sync/maindata", {
          searchParams: rid !== undefined ? { rid } : undefined,
        })
        .json();
      return MainDataResponseSchema.parse(body);
    },

    async getTorrentPeers(hash: string, rid?: number): Promise<TorrentPeersResponse> {
      const body = await http
        .get("sync/torrentPeers", {
          searchParams: {
            hash,
            ...(rid !== undefined ? { rid } : {}),
          },
        })
        .json();
      return TorrentPeersResponseSchema.parse(body);
    },
  };
}
