import { a as subscribe } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/index3.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
import { B as Button } from "../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.data;
  $$unsubscribe_page();
  return `${validate_component(Button, "Button").$$render($$result, { class: "bg-red-500 hover:bg-red-700" }, {}, {
    default: () => {
      return `Sign Out`;
    }
  })}`;
});
export {
  Page as default
};
