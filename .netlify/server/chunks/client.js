import "./exports.js";
import "devalue";
function get(key, parse = JSON.parse) {
  try {
    return parse(sessionStorage[key]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
function invalidateAll() {
  {
    throw new Error("Cannot call invalidateAll() on the server");
  }
}
async function applyAction(result) {
  {
    throw new Error("Cannot call applyAction(...) on the server");
  }
}
export {
  applyAction as a,
  goto as g,
  invalidateAll as i
};
