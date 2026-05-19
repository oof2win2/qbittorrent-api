import type { Got, ExtendOptions } from "got";
import got from "got";
import { CookieJar } from "tough-cookie";
import type { QBittorrentClientConfig } from "./types.ts";

export interface HttpClient extends Got {
  _resetAuth(): void;
}

export function createHttpClient(config: QBittorrentClientConfig): HttpClient {
  const jar = new CookieJar();
  let authenticated = false;
  let authenticating = false;

  const baseUrl = config.url.replace(/\/+$/, "");
  const apiPrefix = `${baseUrl}/api/v2/`;

  const client = got.extend({
    prefixUrl: apiPrefix,
    headers: {
      Referer: baseUrl,
    },
    cookieJar: jar,
    timeout: {
      request: config.timeout ?? 30_000,
    },
    retry: {
      limit: 0,
    },
    hooks: {
      beforeRequest: [
        async (options) => {
          if (authenticating) return;
          if (!authenticated) {
            authenticating = true;
            try {
              await client.post("auth/login", {
                form: {
                  username: config.username,
                  password: config.password,
                },
              });
              authenticated = true;
            } finally {
              authenticating = false;
            }
          }
          const url = options.url?.toString() ?? "";
          if (!url) return;
          const cookieString = await jar.getCookieString(url);
          if (cookieString) {
            options.headers.cookie = cookieString;
          }
        },
      ],
      afterResponse: [
        (response, retryWithMergedOptions) => {
          if (response.statusCode === 403 && authenticated) {
            authenticated = false;
            return retryWithMergedOptions(response.request.options);
          }
          return response;
        },
      ],
    },
    mutableDefaults: true,
  } satisfies ExtendOptions);

  const enhanced = Object.assign(
    (url: string | URL | undefined, options?: Record<string, unknown>) =>
      client(url as string, options as ExtendOptions),
    {
      get: client.get.bind(client),
      post: client.post.bind(client),
      put: client.put.bind(client),
      patch: client.patch.bind(client),
      head: client.head.bind(client),
      delete: client.delete.bind(client),
      extend: client.extend.bind(client),
      stream: client.stream.bind(client),
      paginate: client.paginate.bind(client),
      defaults: client.defaults,
      _resetAuth: () => {
        authenticated = false;
      },
    },
  );

  return enhanced as unknown as HttpClient;
}
