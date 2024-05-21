import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.CF8pjX1p.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.CrKYMqBC.js","_app/immutable/chunks/index.DSYZXv6Y.js","_app/immutable/chunks/utils.kiRnheo0.js","_app/immutable/chunks/entry.CRL_jFje.js","_app/immutable/chunks/stores.LIGlHEWy.js","_app/immutable/chunks/Icon.SK9WVvrk.js","_app/immutable/chunks/create.BbaPum3i.js","_app/immutable/chunks/each.5eSFHvQn.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D-NGHSQ2.js","_app/immutable/chunks/index.Dx9Y9Pfe.js","_app/immutable/chunks/icon.DaL5qel4.js","_app/immutable/chunks/separator.DXu3yIan.js","_app/immutable/chunks/attrs.BDvkrEDx.js","_app/immutable/chunks/constants.0P0HuUCZ.js","_app/immutable/chunks/button.Da_FOX_L.js","_app/immutable/chunks/index.D1CbGC70.js","_app/immutable/chunks/events.BOSu0IVi.js","_app/immutable/chunks/Search.op17KPaL.js"];
export const stylesheets = ["_app/immutable/assets/0.BmU3KyI5.css","_app/immutable/assets/Toaster.CLpmFrbv.css"];
export const fonts = [];
