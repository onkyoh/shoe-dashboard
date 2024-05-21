import { c as create_ssr_component, f as add_attribute } from "./ssr.js";
import { c as cn } from "./utils.js";
import "iconify-icon";
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<iconify-icon${add_attribute("class", cn("text-2xl", className), 0)}${add_attribute("icon", icon, 0)}></iconify-icon>`;
});
export {
  Icon as I
};
