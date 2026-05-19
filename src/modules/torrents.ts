import type { Got } from "got";
import { z } from "zod";
import type {
	AddTorrentParams,
	Categories,
	ShareLimitsParams,
	Torrent,
	TorrentFile,
	TorrentListParams,
	TorrentProperties,
	TorrentsModule,
	Tracker,
	WebSeed,
} from "../types.ts";
import {
	CategoriesSchema,
	TorrentFileSchema,
	TorrentPropertiesSchema,
	TorrentSchema,
	TrackerSchema,
	WebSeedSchema,
} from "../types.ts";
import { normalizeHashes, normalizeList } from "../utils.ts";

export function createTorrentsModule(http: Got): TorrentsModule {
	return {
		async list(params?: TorrentListParams): Promise<Torrent[]> {
			const searchParams: Record<
				string,
				string | number | boolean | undefined
			> = {};
			if (params?.filter) searchParams.filter = params.filter;
			if (params?.category !== undefined)
				searchParams.category = params.category;
			if (params?.tag !== undefined) searchParams.tag = params.tag;
			if (params?.sort) searchParams.sort = params.sort;
			if (params?.reverse !== undefined) searchParams.reverse = params.reverse;
			if (params?.limit !== undefined) searchParams.limit = params.limit;
			if (params?.offset !== undefined) searchParams.offset = params.offset;
			if (params?.hashes) searchParams.hashes = normalizeHashes(params.hashes);

			const body = await http.get("torrents/info", { searchParams }).json();
			return z.array(TorrentSchema).parse(body);
		},

		async getProperties(hash: string): Promise<TorrentProperties> {
			const body = await http
				.get("torrents/properties", { searchParams: { hash } })
				.json();
			return TorrentPropertiesSchema.parse(body);
		},

		async getTrackers(hash: string): Promise<Tracker[]> {
			const body = await http
				.get("torrents/trackers", { searchParams: { hash } })
				.json();
			return z.array(TrackerSchema).parse(body);
		},

		async getWebSeeds(hash: string): Promise<WebSeed[]> {
			const body = await http
				.get("torrents/webseeds", { searchParams: { hash } })
				.json();
			return z.array(WebSeedSchema).parse(body);
		},

		async getFiles(
			hash: string,
			indexes?: string | string[],
		): Promise<TorrentFile[]> {
			const searchParams: Record<string, string> = { hash };
			if (indexes) searchParams.indexes = normalizeHashes(indexes);

			const body = await http.get("torrents/files", { searchParams }).json();
			return z.array(TorrentFileSchema).parse(body);
		},

		async getPieceStates(hash: string): Promise<number[]> {
			const body = await http
				.get("torrents/pieceStates", { searchParams: { hash } })
				.json();
			return z.array(z.number()).parse(body);
		},

		async getPieceHashes(hash: string): Promise<string[]> {
			const body = await http
				.get("torrents/pieceHashes", { searchParams: { hash } })
				.json();
			return z.array(z.string()).parse(body);
		},

		async stop(hashes: string | string[]): Promise<void> {
			await http.post("torrents/stop", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async start(hashes: string | string[]): Promise<void> {
			await http.post("torrents/start", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async delete(
			hashes: string | string[],
			deleteFiles?: boolean,
		): Promise<void> {
			await http.post("torrents/delete", {
				form: {
					hashes: normalizeHashes(hashes),
					deleteFiles: deleteFiles ?? false,
				},
			});
		},

		async recheck(hashes: string | string[]): Promise<void> {
			await http.post("torrents/recheck", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async reannounce(hashes: string | string[]): Promise<void> {
			await http.post("torrents/reannounce", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async editTracker(
			hash: string,
			origUrl: string,
			newUrl: string,
		): Promise<void> {
			await http.post("torrents/editTracker", {
				form: { hash, origUrl, newUrl },
			});
		},

		async removeTrackers(hash: string, urls: string | string[]): Promise<void> {
			await http.post("torrents/removeTrackers", {
				form: { hash, urls: normalizeList(urls, "|") },
			});
		},

		async addPeers(
			hashes: string | string[],
			peers: string | string[],
		): Promise<void> {
			await http.post("torrents/addPeers", {
				form: {
					hashes: normalizeHashes(hashes),
					peers: normalizeList(peers, "|"),
				},
			});
		},

		async add(params: AddTorrentParams): Promise<void> {
			const formData = new FormData();

			if (params.urls) {
				const urls = Array.isArray(params.urls)
					? params.urls.join("\n")
					: params.urls;
				formData.append("urls", urls);
			}

			if (params.torrents) {
				for (const torrent of params.torrents) {
					const blob = new Blob([torrent]);
					formData.append("torrents", blob, "torrent.torrent");
				}
			}

			if (params.savepath) formData.append("savepath", params.savepath);
			if (params.category) formData.append("category", params.category);
			if (params.tags) formData.append("tags", normalizeList(params.tags, ","));
			if (params.skip_checking) formData.append("skip_checking", "true");
			if (params.paused !== undefined)
				formData.append("paused", String(params.paused));
			if (params.root_folder !== undefined)
				formData.append("root_folder", String(params.root_folder));
			if (params.rename) formData.append("rename", params.rename);
			if (params.upLimit !== undefined)
				formData.append("upLimit", String(params.upLimit));
			if (params.dlLimit !== undefined)
				formData.append("dlLimit", String(params.dlLimit));
			if (params.ratioLimit !== undefined)
				formData.append("ratioLimit", String(params.ratioLimit));
			if (params.seedingTimeLimit !== undefined)
				formData.append("seedingTimeLimit", String(params.seedingTimeLimit));
			if (params.autoTMM !== undefined)
				formData.append("autoTMM", String(params.autoTMM));
			if (params.sequentialDownload !== undefined)
				formData.append(
					"sequentialDownload",
					String(params.sequentialDownload),
				);
			if (params.firstLastPiecePrio !== undefined)
				formData.append(
					"firstLastPiecePrio",
					String(params.firstLastPiecePrio),
				);

			await http.post("torrents/add", { body: formData });
		},

		async addTrackers(hash: string, urls: string | string[]): Promise<void> {
			await http.post("torrents/addTrackers", {
				form: {
					hash,
					urls: normalizeList(urls, "\n"),
				},
			});
		},

		async increasePriority(hashes: string | string[]): Promise<void> {
			await http.post("torrents/increasePrio", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async decreasePriority(hashes: string | string[]): Promise<void> {
			await http.post("torrents/decreasePrio", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async maxPriority(hashes: string | string[]): Promise<void> {
			await http.post("torrents/topPrio", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async minPriority(hashes: string | string[]): Promise<void> {
			await http.post("torrents/bottomPrio", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async setFilePriority(
			hash: string,
			id: string | string[],
			priority: number,
		): Promise<void> {
			await http.post("torrents/filePrio", {
				form: {
					hash,
					id: Array.isArray(id) ? id.join("|") : id,
					priority,
				},
			});
		},

		async getDownloadLimit(
			hashes: string | string[],
		): Promise<Record<string, number>> {
			const body = await http
				.post("torrents/downloadLimit", {
					form: { hashes: normalizeHashes(hashes) },
				})
				.json();
			return z.record(z.string(), z.number()).parse(body);
		},

		async setDownloadLimit(
			hashes: string | string[],
			limit: number,
		): Promise<void> {
			await http.post("torrents/setDownloadLimit", {
				form: {
					hashes: normalizeHashes(hashes),
					limit,
				},
			});
		},

		async setShareLimits(
			hashes: string | string[],
			params: ShareLimitsParams,
		): Promise<void> {
			await http.post("torrents/setShareLimits", {
				form: {
					hashes: normalizeHashes(hashes),
					ratioLimit: params.ratioLimit,
					seedingTimeLimit: params.seedingTimeLimit,
					inactiveSeedingTimeLimit: params.inactiveSeedingTimeLimit,
				},
			});
		},

		async getUploadLimit(
			hashes: string | string[],
		): Promise<Record<string, number>> {
			const body = await http
				.post("torrents/uploadLimit", {
					form: { hashes: normalizeHashes(hashes) },
				})
				.json();
			return z.record(z.string(), z.number()).parse(body);
		},

		async setUploadLimit(
			hashes: string | string[],
			limit: number,
		): Promise<void> {
			await http.post("torrents/setUploadLimit", {
				form: {
					hashes: normalizeHashes(hashes),
					limit,
				},
			});
		},

		async setLocation(
			hashes: string | string[],
			location: string,
		): Promise<void> {
			await http.post("torrents/setLocation", {
				form: {
					hashes: normalizeHashes(hashes),
					location,
				},
			});
		},

		async rename(hash: string, name: string): Promise<void> {
			await http.post("torrents/rename", {
				form: { hash, name },
			});
		},

		async setCategory(
			hashes: string | string[],
			category: string,
		): Promise<void> {
			await http.post("torrents/setCategory", {
				form: {
					hashes: normalizeHashes(hashes),
					category,
				},
			});
		},

		async getCategories(): Promise<Categories> {
			const body = await http.get("torrents/categories").json();
			return CategoriesSchema.parse(body);
		},

		async createCategory(category: string, savePath?: string): Promise<void> {
			const form: Record<string, string> = { category };
			if (savePath !== undefined) form.savePath = savePath;
			await http.post("torrents/createCategory", { form });
		},

		async editCategory(category: string, savePath: string): Promise<void> {
			await http.post("torrents/editCategory", {
				form: { category, savePath },
			});
		},

		async removeCategories(categories: string | string[]): Promise<void> {
			await http.post("torrents/removeCategories", {
				form: { categories: normalizeList(categories, "\n") },
			});
		},

		async addTags(
			hashes: string | string[],
			tags: string | string[],
		): Promise<void> {
			await http.post("torrents/addTags", {
				form: {
					hashes: normalizeHashes(hashes),
					tags: normalizeList(tags, ","),
				},
			});
		},

		async removeTags(
			hashes: string | string[],
			tags: string | string[],
		): Promise<void> {
			await http.post("torrents/removeTags", {
				form: {
					hashes: normalizeHashes(hashes),
					tags: normalizeList(tags, ","),
				},
			});
		},

		async getTags(): Promise<string[]> {
			const body = await http.get("torrents/tags").json();
			return z.array(z.string()).parse(body);
		},

		async createTags(tags: string | string[]): Promise<void> {
			await http.post("torrents/createTags", {
				form: { tags: normalizeList(tags, ",") },
			});
		},

		async deleteTags(tags: string | string[]): Promise<void> {
			await http.post("torrents/deleteTags", {
				form: { tags: normalizeList(tags, ",") },
			});
		},

		async setAutoManagement(
			hashes: string | string[],
			enable: boolean,
		): Promise<void> {
			await http.post("torrents/setAutoManagement", {
				form: {
					hashes: normalizeHashes(hashes),
					enable,
				},
			});
		},

		async toggleSequentialDownload(hashes: string | string[]): Promise<void> {
			await http.post("torrents/toggleSequentialDownload", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async toggleFirstLastPiecePrio(hashes: string | string[]): Promise<void> {
			await http.post("torrents/toggleFirstLastPiecePrio", {
				form: { hashes: normalizeHashes(hashes) },
			});
		},

		async setForceStart(
			hashes: string | string[],
			value: boolean,
		): Promise<void> {
			await http.post("torrents/setForceStart", {
				form: {
					hashes: normalizeHashes(hashes),
					value,
				},
			});
		},

		async setSuperSeeding(
			hashes: string | string[],
			value: boolean,
		): Promise<void> {
			await http.post("torrents/setSuperSeeding", {
				form: {
					hashes: normalizeHashes(hashes),
					value,
				},
			});
		},

		async renameFile(
			hash: string,
			oldPath: string,
			newPath: string,
		): Promise<void> {
			await http.post("torrents/renameFile", {
				form: { hash, oldPath, newPath },
			});
		},

		async renameFolder(
			hash: string,
			oldPath: string,
			newPath: string,
		): Promise<void> {
			await http.post("torrents/renameFolder", {
				form: { hash, oldPath, newPath },
			});
		},
	};
}
