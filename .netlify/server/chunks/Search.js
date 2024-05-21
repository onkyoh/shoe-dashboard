import { c as compute_rest_props, a as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, h as escape_attribute_value, b as escape_object, f as add_attribute, v as validate_component } from "./ssr.js";
import "./index3.js";
import "dequal";
import "./create.js";
import { c as cn } from "./utils.js";
import { I as Icon } from "./icon.js";
import { p as page } from "./stores.js";
import { B as Button } from "./button.js";
const SearchInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  let { value = "" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<input${spread(
    [
      {
        class: escape_attribute_value("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50")
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { class: className = "" } = $$props;
  $page.data.supabase;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_page();
  return `<form method="GET" action="/shoes"${add_attribute("class", cn("relative", className), 0)}><div class="flex relative items-center gap-2">${validate_component(SearchInput, "SearchInput").$$render(
    $$result,
    {
      type: "search",
      placeholder: "Search",
      name: "name",
      autocomplete: "off"
    },
    {},
    {}
  )} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
    default: () => {
      return `${validate_component(Icon, "Icon").$$render($$result, { icon: "tabler:search" }, {}, {})}`;
    }
  })}</div> ${``}</form>`;
});
export {
  Search as S
};
