import * as server from '../entries/pages/resources/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/resources/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/resources/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.BROnZntJ.js","_app/immutable/chunks/scheduler.CrKYMqBC.js","_app/immutable/chunks/index.DSYZXv6Y.js","_app/immutable/chunks/each.5eSFHvQn.js","_app/immutable/chunks/Article.BZ8puy3b.js","_app/immutable/chunks/utils.kiRnheo0.js","_app/immutable/chunks/entry.CRL_jFje.js"];
export const stylesheets = [];
export const fonts = [];
