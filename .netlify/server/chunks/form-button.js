import { c as compute_rest_props } from "./lifecycle.js";
import { c as create_ssr_component, f as add_attribute, v as validate_component } from "./ssr.js";
import "./index3.js";
import { B as Button } from "./button.js";
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"${add_attribute("class", `animate-spin text-primary ${className}`, 0)}><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;
});
const Form_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isSubmitting"]);
  let { isSubmitting = false } = $$props;
  if ($$props.isSubmitting === void 0 && $$bindings.isSubmitting && isSubmitting !== void 0)
    $$bindings.isSubmitting(isSubmitting);
  return `${validate_component(Button, "Button.Root").$$render($$result, Object.assign({}, { type: "submit" }, { class: "w-full" }, { disabled: isSubmitting }, $$restProps), {}, {
    default: () => {
      return `${isSubmitting ? `${validate_component(Spinner, "Spinner").$$render($$result, { className: "text-white mr-2" }, {}, {})}` : ``} ${slots.default ? slots.default({}) : ``} `;
    }
  })}`;
});
export {
  Form_button as F
};
