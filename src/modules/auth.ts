import type { HttpClient } from "../client.ts";
import type { AuthModule } from "../types.ts";

export function createAuthModule(
  http: HttpClient,
  username: string,
  password: string,
): AuthModule {
  return {
    async login(): Promise<string> {
      const res = await http.post("auth/login", {
        form: { username, password },
      });

      const setCookie = res.headers["set-cookie"];
      let sid = "";
      if (setCookie) {
        for (const cookie of setCookie) {
          const match = cookie.match(/SID=([^;]+)/);
          if (match) {
            sid = match[1] ?? "";
            break;
          }
        }
      }

      return sid;
    },

    async logout(): Promise<void> {
      await http.post("auth/logout");
      http._resetAuth();
    },
  };
}
