import type { Got } from "got";
import type { LogModule, LogParams, PeerLogParams, LogEntry, PeerLogEntry } from "../types.ts";
import { LogEntrySchema, PeerLogEntrySchema } from "../types.ts";
import { z } from "zod";

export function createLogModule(http: Got): LogModule {
  return {
    async getLog(params?: LogParams): Promise<LogEntry[]> {
      const body = await http
        .get("log/main", {
          searchParams: params as Record<string, string | number | boolean | undefined>,
        })
        .json();
      return z.array(LogEntrySchema).parse(body);
    },

    async getPeerLog(params?: PeerLogParams): Promise<PeerLogEntry[]> {
      const body = await http
        .get("log/peers", {
          searchParams: params as Record<string, string | number | boolean | undefined>,
        })
        .json();
      return z.array(PeerLogEntrySchema).parse(body);
    },
  };
}
