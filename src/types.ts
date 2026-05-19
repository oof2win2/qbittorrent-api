import { z } from "zod";

export const BuildInfoSchema = z.object({
  qt: z.string(),
  libtorrent: z.string(),
  boost: z.string(),
  openssl: z.string(),
  bitness: z.number(),
});
export type BuildInfo = z.infer<typeof BuildInfoSchema>;

export const AppPreferencesSchema = z.object({
  locale: z.string(),
  create_subfolder_enabled: z.boolean(),
  start_paused_enabled: z.boolean(),
  auto_delete_mode: z.number(),
  preallocate_all: z.boolean(),
  incomplete_files_ext: z.boolean(),
  auto_tmm_enabled: z.boolean(),
  torrent_changed_tmm_enabled: z.boolean(),
  save_path_changed_tmm_enabled: z.boolean(),
  category_changed_tmm_enabled: z.boolean(),
  save_path: z.string(),
  temp_path_enabled: z.boolean(),
  temp_path: z.string(),
  scan_dirs: z.record(z.string(), z.union([z.number(), z.string()])),
  export_dir: z.string(),
  export_dir_fin: z.string(),
  mail_notification_enabled: z.boolean(),
  mail_notification_sender: z.string(),
  mail_notification_email: z.string(),
  mail_notification_smtp: z.string(),
  mail_notification_ssl_enabled: z.boolean(),
  mail_notification_auth_enabled: z.boolean(),
  mail_notification_username: z.string(),
  mail_notification_password: z.string(),
  autorun_enabled: z.boolean(),
  autorun_program: z.string(),
  queueing_enabled: z.boolean(),
  max_active_downloads: z.number(),
  max_active_torrents: z.number(),
  max_active_uploads: z.number(),
  dont_count_slow_torrents: z.boolean(),
  slow_torrent_dl_rate_threshold: z.number(),
  slow_torrent_ul_rate_threshold: z.number(),
  slow_torrent_inactive_timer: z.number(),
  max_ratio_enabled: z.boolean(),
  max_ratio: z.number(),
  max_ratio_act: z.number(),
  listen_port: z.number(),
  upnp: z.boolean(),
  random_port: z.boolean(),
  dl_limit: z.number(),
  up_limit: z.number(),
  max_connec: z.number(),
  max_connec_per_torrent: z.number(),
  max_uploads: z.number(),
  max_uploads_per_torrent: z.number(),
  stop_tracker_timeout: z.number(),
  enable_piece_extent_affinity: z.boolean(),
  bittorrent_protocol: z.number(),
  limit_utp_rate: z.boolean(),
  limit_tcp_overhead: z.boolean(),
  limit_lan_peers: z.boolean(),
  alt_dl_limit: z.number(),
  alt_up_limit: z.number(),
  scheduler_enabled: z.boolean(),
  schedule_from_hour: z.number(),
  schedule_from_min: z.number(),
  schedule_to_hour: z.number(),
  schedule_to_min: z.number(),
  scheduler_days: z.number(),
  dht: z.boolean(),
  pex: z.boolean(),
  lsd: z.boolean(),
  encryption: z.number(),
  anonymous_mode: z.boolean(),
  proxy_type: z.number(),
  proxy_ip: z.string(),
  proxy_port: z.number(),
  proxy_peer_connections: z.boolean(),
  proxy_auth_enabled: z.boolean(),
  proxy_username: z.string(),
  proxy_password: z.string(),
  proxy_torrents_only: z.boolean(),
  ip_filter_enabled: z.boolean(),
  ip_filter_path: z.string(),
  ip_filter_trackers: z.boolean(),
  web_ui_domain_list: z.string(),
  web_ui_address: z.string(),
  web_ui_port: z.number(),
  web_ui_upnp: z.boolean(),
  web_ui_username: z.string(),
  web_ui_password: z.string(),
  web_ui_csrf_protection_enabled: z.boolean(),
  web_ui_clickjacking_protection_enabled: z.boolean(),
  web_ui_secure_cookie_enabled: z.boolean(),
  web_ui_max_auth_fail_count: z.number(),
  web_ui_ban_duration: z.number(),
  web_ui_session_timeout: z.number(),
  web_ui_host_header_validation_enabled: z.boolean(),
  bypass_local_auth: z.boolean(),
  bypass_auth_subnet_whitelist_enabled: z.boolean(),
  bypass_auth_subnet_whitelist: z.string(),
  alternative_webui_enabled: z.boolean(),
  alternative_webui_path: z.string(),
  use_https: z.boolean(),
  ssl_key: z.string(),
  ssl_cert: z.string(),
  web_ui_https_key_path: z.string(),
  web_ui_https_cert_path: z.string(),
  dyndns_enabled: z.boolean(),
  dyndns_service: z.number(),
  dyndns_username: z.string(),
  dyndns_password: z.string(),
  dyndns_domain: z.string(),
  rss_refresh_interval: z.number(),
  rss_max_articles_per_feed: z.number(),
  rss_processing_enabled: z.boolean(),
  rss_auto_downloading_enabled: z.boolean(),
  rss_download_repack_proper_episodes: z.boolean(),
  rss_smart_episode_filters: z.string(),
  add_trackers_enabled: z.boolean(),
  add_trackers: z.string(),
  web_ui_use_custom_http_headers_enabled: z.boolean(),
  web_ui_custom_http_headers: z.string(),
  max_seeding_time_enabled: z.boolean(),
  max_seeding_time: z.number(),
  announce_ip: z.string(),
  announce_to_all_tiers: z.boolean(),
  announce_to_all_trackers: z.boolean(),
  async_io_threads: z.number(),
  banned_IPs: z.string(),
  checking_memory_use: z.number(),
  current_interface_address: z.string(),
  current_network_interface: z.string(),
  disk_cache: z.number(),
  disk_cache_ttl: z.number(),
  embedded_tracker_port: z.number(),
  enable_coalesce_read_write: z.boolean(),
  enable_embedded_tracker: z.boolean(),
  enable_multi_connections_from_same_ip: z.boolean(),
  enable_os_cache: z.boolean(),
  enable_upload_suggestions: z.boolean(),
  file_pool_size: z.number(),
  outgoing_ports_max: z.number(),
  outgoing_ports_min: z.number(),
  recheck_completed_torrents: z.boolean(),
  resolve_peer_countries: z.boolean(),
  save_resume_data_interval: z.number(),
  send_buffer_low_watermark: z.number(),
  send_buffer_watermark: z.number(),
  send_buffer_watermark_factor: z.number(),
  socket_backlog_size: z.number(),
  upload_choking_algorithm: z.number(),
  upload_slots_behavior: z.number(),
  upnp_lease_duration: z.number(),
  utp_tcp_mixed_mode: z.number(),
}).passthrough();
export type AppPreferences = z.infer<typeof AppPreferencesSchema>;

export const AppCookieSchema = z.object({
  name: z.string(),
  domain: z.string(),
  path: z.string(),
  value: z.string(),
  expirationDate: z.number(),
});
export type AppCookie = z.infer<typeof AppCookieSchema>;

export const AppCookieInputSchema = z.object({
  name: z.string().optional(),
  domain: z.string().optional(),
  path: z.string().optional(),
  value: z.string().optional(),
  expirationDate: z.number().optional(),
});
export type AppCookieInput = z.infer<typeof AppCookieInputSchema>;

export const LogEntrySchema = z.object({
  id: z.number(),
  message: z.string(),
  timestamp: z.number(),
  type: z.number(),
});
export type LogEntry = z.infer<typeof LogEntrySchema>;

export const PeerLogEntrySchema = z.object({
  id: z.number(),
  ip: z.string(),
  timestamp: z.number(),
  blocked: z.boolean(),
  reason: z.string(),
});
export type PeerLogEntry = z.infer<typeof PeerLogEntrySchema>;

export const TransferInfoSchema = z.object({
  dl_info_speed: z.number(),
  dl_info_data: z.number(),
  up_info_speed: z.number(),
  up_info_data: z.number(),
  dl_rate_limit: z.number(),
  up_rate_limit: z.number(),
  dht_nodes: z.number(),
  connection_status: z.string(),
  queueing: z.boolean().optional(),
  use_alt_speed_limits: z.boolean().optional(),
  refresh_interval: z.number().optional(),
});
export type TransferInfo = z.infer<typeof TransferInfoSchema>;

const TorrentStateSchema = z.enum([
  "error",
  "missingFiles",
  "uploading",
  "pausedUP",
  "queuedUP",
  "stalledUP",
  "checkingUP",
  "forcedUP",
  "allocating",
  "downloading",
  "metaDL",
  "pausedDL",
  "queuedDL",
  "stalledDL",
  "checkingDL",
  "forcedDL",
  "checkingResumeData",
  "moving",
  "unknown",
]);
export type TorrentState = z.infer<typeof TorrentStateSchema>;

export const TorrentSchema = z.object({
  added_on: z.number(),
  amount_left: z.number(),
  auto_tmm: z.boolean(),
  availability: z.number(),
  category: z.string(),
  completed: z.number(),
  completion_on: z.number(),
  content_path: z.string(),
  dl_limit: z.number(),
  dlspeed: z.number(),
  downloaded: z.number(),
  downloaded_session: z.number(),
  eta: z.number(),
  f_l_piece_prio: z.boolean(),
  force_start: z.boolean(),
  hash: z.string(),
  isPrivate: z.boolean(),
  last_activity: z.number(),
  magnet_uri: z.string(),
  max_ratio: z.number(),
  max_seeding_time: z.number(),
  name: z.string(),
  num_complete: z.number(),
  num_incomplete: z.number(),
  num_leechs: z.number(),
  num_seeds: z.number(),
  priority: z.number(),
  progress: z.number(),
  ratio: z.number(),
  ratio_limit: z.number(),
  reannounce: z.number(),
  save_path: z.string(),
  seeding_time: z.number(),
  seeding_time_limit: z.number(),
  seen_complete: z.number(),
  seq_dl: z.boolean(),
  size: z.number(),
  state: TorrentStateSchema,
  super_seeding: z.boolean(),
  tags: z.string(),
  time_active: z.number(),
  total_size: z.number(),
  tracker: z.string(),
  up_limit: z.number(),
  uploaded: z.number(),
  uploaded_session: z.number(),
  upspeed: z.number(),
}).passthrough();
export type Torrent = z.infer<typeof TorrentSchema>;

export const TorrentPropertiesSchema = z.object({
  save_path: z.string(),
  creation_date: z.number(),
  piece_size: z.number(),
  comment: z.string(),
  total_wasted: z.number(),
  total_uploaded: z.number(),
  total_uploaded_session: z.number(),
  total_downloaded: z.number(),
  total_downloaded_session: z.number(),
  up_limit: z.number(),
  dl_limit: z.number(),
  time_elapsed: z.number(),
  seeding_time: z.number(),
  nb_connections: z.number(),
  nb_connections_limit: z.number(),
  share_ratio: z.number(),
  addition_date: z.number(),
  completion_date: z.number(),
  created_by: z.string(),
  dl_speed_avg: z.number(),
  dl_speed: z.number(),
  eta: z.number(),
  last_seen: z.number(),
  peers: z.number(),
  peers_total: z.number(),
  pieces_have: z.number(),
  pieces_num: z.number(),
  reannounce: z.number(),
  seeds: z.number(),
  seeds_total: z.number(),
  total_size: z.number(),
  up_speed_avg: z.number(),
  up_speed: z.number(),
  isPrivate: z.boolean(),
});
export type TorrentProperties = z.infer<typeof TorrentPropertiesSchema>;

export const TrackerSchema = z.object({
  url: z.string(),
  status: z.number(),
  tier: z.number(),
  num_peers: z.number(),
  num_seeds: z.number(),
  num_leeches: z.number(),
  num_downloaded: z.number(),
  msg: z.string(),
});
export type Tracker = z.infer<typeof TrackerSchema>;

export const WebSeedSchema = z.object({
  url: z.string(),
});
export type WebSeed = z.infer<typeof WebSeedSchema>;

export const TorrentFileSchema = z.object({
  index: z.number(),
  name: z.string(),
  size: z.number(),
  progress: z.number(),
  priority: z.number(),
  is_seed: z.boolean(),
  piece_range: z.tuple([z.number(), z.number()]),
  availability: z.number(),
});
export type TorrentFile = z.infer<typeof TorrentFileSchema>;

export const CategorySchema = z.object({
  name: z.string(),
  savePath: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export const CategoriesSchema = z.record(z.string(), CategorySchema);
export type Categories = z.infer<typeof CategoriesSchema>;

export const MainDataResponseSchema = z.object({
  rid: z.number(),
  full_update: z.boolean(),
  torrents: z.record(z.string(), TorrentSchema.partial()).optional(),
  torrents_removed: z.array(z.string()).optional(),
  categories: z.record(z.string(), CategorySchema).optional(),
  categories_removed: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  tags_removed: z.array(z.string()).optional(),
  server_state: TransferInfoSchema.optional(),
}).passthrough();
export type MainDataResponse = z.infer<typeof MainDataResponseSchema>;

export const PeerInfoSchema = z.object({
  ip: z.string(),
  port: z.number(),
  connection: z.string(),
  flags: z.string(),
  flags_desc: z.string(),
  client: z.string(),
  progress: z.number(),
  dl_speed: z.number(),
  up_speed: z.number(),
  downloaded: z.number(),
  uploaded: z.number(),
  relevance: z.number(),
  files: z.string(),
}).passthrough();
export type PeerInfo = z.infer<typeof PeerInfoSchema>;

export const TorrentPeersResponseSchema = z.object({
  rid: z.number(),
  full_update: z.boolean(),
  peers: z.record(z.string(), PeerInfoSchema).optional(),
  peers_removed: z.array(z.string()).optional(),
  show_flags: z.boolean().optional(),
}).passthrough();
export type TorrentPeersResponse = z.infer<typeof TorrentPeersResponseSchema>;

export type QBittorrentClientConfig = {
  url: string;
  username: string;
  password: string;
  timeout?: number;
};

export type QBittorrentApi = import("got").Got;

export type TorrentListFilter =
  | "all"
  | "downloading"
  | "seeding"
  | "completed"
  | "stopped"
  | "active"
  | "inactive"
  | "running"
  | "stalled"
  | "stalled_uploading"
  | "stalled_downloading"
  | "errored";

export type TorrentListParams = {
  filter?: TorrentListFilter;
  category?: string;
  tag?: string;
  sort?: string;
  reverse?: boolean;
  limit?: number;
  offset?: number;
  hashes?: string | string[];
};

export type LogParams = {
  normal?: boolean;
  info?: boolean;
  warning?: boolean;
  critical?: boolean;
  last_known_id?: number;
};

export type PeerLogParams = {
  last_known_id?: number;
};

export type AddTorrentParams = {
  urls?: string | string[];
  torrents?: Buffer[];
  savepath?: string;
  category?: string;
  tags?: string | string[];
  skip_checking?: boolean;
  paused?: boolean;
  root_folder?: boolean;
  rename?: string;
  upLimit?: number;
  dlLimit?: number;
  ratioLimit?: number;
  seedingTimeLimit?: number;
  autoTMM?: boolean;
  sequentialDownload?: boolean;
  firstLastPiecePrio?: boolean;
};

export type ShareLimitsParams = {
  ratioLimit: number;
  seedingTimeLimit: number;
  inactiveSeedingTimeLimit: number;
};

export interface AuthModule {
  login: () => Promise<string>;
  logout: () => Promise<void>;
}

export interface AppModule {
  getVersion: () => Promise<string>;
  getApiVersion: () => Promise<string>;
  getBuildInfo: () => Promise<BuildInfo>;
  shutdown: () => Promise<void>;
  getPreferences: () => Promise<AppPreferences>;
  setPreferences: (prefs: Partial<AppPreferences>) => Promise<void>;
  getDefaultSavePath: () => Promise<string>;
  getCookies: () => Promise<AppCookie[]>;
  setCookies: (cookies: AppCookieInput[]) => Promise<void>;
}

export interface LogModule {
  getLog: (params?: LogParams) => Promise<LogEntry[]>;
  getPeerLog: (params?: PeerLogParams) => Promise<PeerLogEntry[]>;
}

export interface SyncModule {
  getMainData: (rid?: number) => Promise<MainDataResponse>;
  getTorrentPeers: (hash: string, rid?: number) => Promise<TorrentPeersResponse>;
}

export interface TransferModule {
  getInfo: () => Promise<TransferInfo>;
  getSpeedLimitsMode: () => Promise<number>;
  toggleSpeedLimitsMode: () => Promise<void>;
  getDownloadLimit: () => Promise<number>;
  setDownloadLimit: (limit: number) => Promise<void>;
  getUploadLimit: () => Promise<number>;
  setUploadLimit: (limit: number) => Promise<void>;
  banPeers: (peers: string | string[]) => Promise<void>;
}

export interface TorrentsModule {
  list: (params?: TorrentListParams) => Promise<Torrent[]>;
  getProperties: (hash: string) => Promise<TorrentProperties>;
  getTrackers: (hash: string) => Promise<Tracker[]>;
  getWebSeeds: (hash: string) => Promise<WebSeed[]>;
  getFiles: (hash: string, indexes?: string | string[]) => Promise<TorrentFile[]>;
  getPieceStates: (hash: string) => Promise<number[]>;
  getPieceHashes: (hash: string) => Promise<string[]>;
  stop: (hashes: string | string[]) => Promise<void>;
  start: (hashes: string | string[]) => Promise<void>;
  delete: (hashes: string | string[], deleteFiles?: boolean) => Promise<void>;
  recheck: (hashes: string | string[]) => Promise<void>;
  reannounce: (hashes: string | string[]) => Promise<void>;
  editTracker: (hash: string, origUrl: string, newUrl: string) => Promise<void>;
  removeTrackers: (hash: string, urls: string | string[]) => Promise<void>;
  addPeers: (hashes: string | string[], peers: string | string[]) => Promise<void>;
  add: (params: AddTorrentParams) => Promise<void>;
  addTrackers: (hash: string, urls: string | string[]) => Promise<void>;
  increasePriority: (hashes: string | string[]) => Promise<void>;
  decreasePriority: (hashes: string | string[]) => Promise<void>;
  maxPriority: (hashes: string | string[]) => Promise<void>;
  minPriority: (hashes: string | string[]) => Promise<void>;
  setFilePriority: (hash: string, id: string | string[], priority: number) => Promise<void>;
  getDownloadLimit: (hashes: string | string[]) => Promise<Record<string, number>>;
  setDownloadLimit: (hashes: string | string[], limit: number) => Promise<void>;
  setShareLimits: (hashes: string | string[], params: ShareLimitsParams) => Promise<void>;
  getUploadLimit: (hashes: string | string[]) => Promise<Record<string, number>>;
  setUploadLimit: (hashes: string | string[], limit: number) => Promise<void>;
  setLocation: (hashes: string | string[], location: string) => Promise<void>;
  rename: (hash: string, name: string) => Promise<void>;
  setCategory: (hashes: string | string[], category: string) => Promise<void>;
  getCategories: () => Promise<Categories>;
  createCategory: (category: string, savePath?: string) => Promise<void>;
  editCategory: (category: string, savePath: string) => Promise<void>;
  removeCategories: (categories: string | string[]) => Promise<void>;
  addTags: (hashes: string | string[], tags: string | string[]) => Promise<void>;
  removeTags: (hashes: string | string[], tags: string | string[]) => Promise<void>;
  getTags: () => Promise<string[]>;
  createTags: (tags: string | string[]) => Promise<void>;
  deleteTags: (tags: string | string[]) => Promise<void>;
  setAutoManagement: (hashes: string | string[], enable: boolean) => Promise<void>;
  toggleSequentialDownload: (hashes: string | string[]) => Promise<void>;
  toggleFirstLastPiecePrio: (hashes: string | string[]) => Promise<void>;
  setForceStart: (hashes: string | string[], value: boolean) => Promise<void>;
  setSuperSeeding: (hashes: string | string[], value: boolean) => Promise<void>;
  renameFile: (hash: string, oldPath: string, newPath: string) => Promise<void>;
  renameFolder: (hash: string, oldPath: string, newPath: string) => Promise<void>;
}

export interface QBittorrentClient {
  auth: AuthModule;
  app: AppModule;
  log: LogModule;
  sync: SyncModule;
  transfer: TransferModule;
  torrents: TorrentsModule;
}
