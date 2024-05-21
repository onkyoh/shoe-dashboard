import { c as create_ssr_component, g as each, v as validate_component } from "../../../chunks/ssr.js";
import { A as Article } from "../../../chunks/Article.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let tempResources = Array(5).fill(data.resources[0]);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${each(tempResources, (article) => {
    return `${validate_component(Article, "Article").$$render($$result, { article }, {}, {})}`;
  })}</div>`;
});
export {
  Page as default
};
