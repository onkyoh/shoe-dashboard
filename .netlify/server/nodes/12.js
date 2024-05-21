import * as server from '../entries/pages/group/join/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/group/join/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/group/join/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.CC7QSGY9.js","_app/immutable/chunks/scheduler.CrKYMqBC.js","_app/immutable/chunks/index.DSYZXv6Y.js","_app/immutable/chunks/card-content.CwvFJnD5.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/utils.kiRnheo0.js","_app/immutable/chunks/entry.CRL_jFje.js","_app/immutable/chunks/card-title.CzuIBwsd.js","_app/immutable/chunks/Link.CrYxhteB.js","_app/immutable/chunks/separator.DXu3yIan.js","_app/immutable/chunks/create.BbaPum3i.js","_app/immutable/chunks/attrs.BDvkrEDx.js"];
export const stylesheets = [];
export const fonts = [];
