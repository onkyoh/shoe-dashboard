import * as server from '../entries/pages/resources/_title_/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/resources/[title]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.BXuSO3iq.js","_app/immutable/chunks/scheduler.CrKYMqBC.js","_app/immutable/chunks/index.DSYZXv6Y.js"];
export const stylesheets = [];
export const fonts = [];
