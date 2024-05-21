import { c as create_ssr_component, f as add_attribute } from "./ssr.js";
import { c as cn } from "./utils.js";
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { href } = $$props;
  let { newTab = false } = $$props;
  let targetProp = newTab ? "_blank" : void 0;
  let relProp = newTab ? "noopener noreferrer" : void 0;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.newTab === void 0 && $$bindings.newTab && newTab !== void 0)
    $$bindings.newTab(newTab);
  return `<a${add_attribute("class", cn("text-blue-500 underline", className), 0)}${add_attribute("href", href, 0)}${add_attribute("target", targetProp, 0)}${add_attribute("rel", relProp, 0)}>${slots.default ? slots.default({}) : ``}</a>`;
});
export {
  Link as L
};
