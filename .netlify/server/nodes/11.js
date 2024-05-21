import * as server from '../entries/pages/group/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/group/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/group/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.BZtpmoRK.js","_app/immutable/chunks/scheduler.CrKYMqBC.js","_app/immutable/chunks/index.DSYZXv6Y.js","_app/immutable/chunks/each.5eSFHvQn.js","_app/immutable/chunks/card-content.CwvFJnD5.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/utils.kiRnheo0.js","_app/immutable/chunks/entry.CRL_jFje.js","_app/immutable/chunks/card-header.Dn98cJfE.js","_app/immutable/chunks/card-title.CzuIBwsd.js","_app/immutable/chunks/index.DhExuHYU.js","_app/immutable/chunks/Icon.SK9WVvrk.js","_app/immutable/chunks/create.BbaPum3i.js","_app/immutable/chunks/events.BOSu0IVi.js","_app/immutable/chunks/separator.DXu3yIan.js","_app/immutable/chunks/attrs.BDvkrEDx.js","_app/immutable/chunks/input.DQuCzM55.js","_app/immutable/chunks/index.Dx9Y9Pfe.js","_app/immutable/chunks/icon.DaL5qel4.js","_app/immutable/chunks/form-button.C8eeVFJS.js","_app/immutable/chunks/button.Da_FOX_L.js","_app/immutable/chunks/index.D1CbGC70.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.D-NGHSQ2.js","_app/immutable/chunks/zod.CJtafJGM.js","_app/immutable/chunks/stores.LIGlHEWy.js","_app/immutable/chunks/_commonjsHelpers.CqkleIqs.js","_app/immutable/chunks/textarea.DRBatE5M.js","_app/immutable/chunks/card-description.CY8mQjXQ.js","_app/immutable/chunks/card-footer.D7ltClmG.js","_app/immutable/chunks/form-label.0_trn4lp.js","_app/immutable/chunks/constants.0P0HuUCZ.js","_app/immutable/chunks/Acitivty.CDIxaqlu.js","_app/immutable/chunks/carousel-item.BrXt-PDa.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.CLpmFrbv.css","_app/immutable/assets/zod.Crp_yK76.css"];
export const fonts = [];
