import type { Got } from "got";
import { z } from "zod";
import type {
	AppCookie,
	AppCookieInput,
	AppModule,
	AppPreferences,
	BuildInfo,
} from "../types.ts";
import {
	AppCookieInputSchema,
	AppCookieSchema,
	AppPreferencesSchema,
	BuildInfoSchema,
} from "../types.ts";

export function createAppModule(http: Got): AppModule {
	return {
		async getVersion(): Promise<string> {
			return http.get("app/version").text();
		},

		async getApiVersion(): Promise<string> {
			return http.get("app/webapiVersion").text();
		},

		async getBuildInfo(): Promise<BuildInfo> {
			const body = await http.get("app/buildInfo").json();
			return BuildInfoSchema.parse(body);
		},

		async shutdown(): Promise<void> {
			await http.post("app/shutdown");
		},

		async getPreferences(): Promise<AppPreferences> {
			const body = await http.get("app/preferences").json();
			return AppPreferencesSchema.parse(body);
		},

		async setPreferences(prefs: Partial<AppPreferences>): Promise<void> {
			await http.post("app/setPreferences", {
				form: { json: JSON.stringify(prefs) },
			});
		},

		async getDefaultSavePath(): Promise<string> {
			return http.get("app/defaultSavePath").text();
		},

		async getCookies(): Promise<AppCookie[]> {
			const body = await http.get("app/cookies").json();
			return z.array(AppCookieSchema).parse(body);
		},

		async setCookies(cookies: AppCookieInput[]): Promise<void> {
			await http.post("app/setCookies", {
				json: z.array(AppCookieInputSchema).parse(cookies),
			});
		},
	};
}
