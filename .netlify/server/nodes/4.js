import * as server from '../entries/pages/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BPJI5GT-.js","_app/immutable/chunks/scheduler.CrKYMqBC.js","_app/immutable/chunks/index.DSYZXv6Y.js","_app/immutable/chunks/each.5eSFHvQn.js","_app/immutable/chunks/carousel-item.BrXt-PDa.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/utils.kiRnheo0.js","_app/immutable/chunks/entry.CRL_jFje.js","_app/immutable/chunks/index.Dx9Y9Pfe.js","_app/immutable/chunks/create.BbaPum3i.js","_app/immutable/chunks/card-content.CwvFJnD5.js","_app/immutable/chunks/card-description.CY8mQjXQ.js","_app/immutable/chunks/card-header.Dn98cJfE.js","_app/immutable/chunks/card-title.CzuIBwsd.js","_app/immutable/chunks/ShoeCard.DMSuOF7r.js","_app/immutable/chunks/icon.DaL5qel4.js","_app/immutable/chunks/card-footer.D7ltClmG.js","_app/immutable/chunks/Acitivty.CDIxaqlu.js","_app/immutable/chunks/constants.0P0HuUCZ.js","_app/immutable/chunks/Article.BZ8puy3b.js"];
export const stylesheets = [];
export const fonts = [];
