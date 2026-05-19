import type { Got } from "got";
import type { TransferModule, TransferInfo } from "../types.ts";
import { TransferInfoSchema } from "../types.ts";
import { normalizeList } from "../utils.ts";

export function createTransferModule(http: Got): TransferModule {
  return {
    async getInfo(): Promise<TransferInfo> {
      const body = await http.get("transfer/info").json();
      return TransferInfoSchema.parse(body);
    },

    async getSpeedLimitsMode(): Promise<number> {
      const body = await http.get("transfer/speedLimitsMode").text();
      return Number(body);
    },

    async toggleSpeedLimitsMode(): Promise<void> {
      await http.post("transfer/toggleSpeedLimitsMode");
    },

    async getDownloadLimit(): Promise<number> {
      const body = await http.get("transfer/downloadLimit").text();
      return Number(body);
    },

    async setDownloadLimit(limit: number): Promise<void> {
      await http.post("transfer/setDownloadLimit", {
        form: { limit },
      });
    },

    async getUploadLimit(): Promise<number> {
      const body = await http.get("transfer/uploadLimit").text();
      return Number(body);
    },

    async setUploadLimit(limit: number): Promise<void> {
      await http.post("transfer/setUploadLimit", {
        form: { limit },
      });
    },

    async banPeers(peers: string | string[]): Promise<void> {
      await http.post("transfer/banPeers", {
        form: { peers: normalizeList(peers, "|") },
      });
    },
  };
}
