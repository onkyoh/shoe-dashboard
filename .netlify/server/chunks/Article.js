import { c as create_ssr_component, f as add_attribute, e as escape } from "./ssr.js";
import { a as formatCreatedAt } from "./utils.js";
const Article = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { article } = $$props;
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  return `<a${add_attribute("href", `/resources/${article.title}`, 0)} class="flex flex-col gap-2 overflow-x-hidden bg-white rounded-lg p-4 border-2 hover:border-primary h-fit"><h2 class="text-md font-semibold">${escape(article.title)}</h2> <div class="flex justify-between text-muted-foreground text-sm"><span data-svelte-h="svelte-z4l4i7">Adnan Radwan</span> <span>${escape(formatCreatedAt(article.created_at))}</span></div> <p class="text-muted-foreground">${escape(article.description)}</p></a>`;
});
export {
  Article as A
};
