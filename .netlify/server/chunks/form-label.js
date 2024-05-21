import { c as compute_rest_props, a as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { g as getFormControl } from "./index5.js";
import { c as cn } from "./utils.js";
import { L as Label } from "./input.js";
const Form_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $labelAttrs, $$unsubscribe_labelAttrs;
  let { class: className = void 0 } = $$props;
  const { labelAttrs } = getFormControl();
  $$unsubscribe_labelAttrs = subscribe(labelAttrs, (value) => $labelAttrs = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_labelAttrs();
  return `${validate_component(Label, "Label").$$render(
    $$result,
    Object.assign(
      {},
      $labelAttrs,
      {
        class: cn("data-[fs-error]:text-destructive", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({ labelAttrs }) : ``}`;
      }
    }
  )}`;
});
export {
  Form_label as F
};
