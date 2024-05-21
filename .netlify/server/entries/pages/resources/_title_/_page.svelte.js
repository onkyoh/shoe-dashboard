import { c as create_ssr_component, e as escape } from "../../../../chunks/ssr.js";
const css = {
  code: "article.svelte-1gbume7 h1{font-size:2rem}article.svelte-1gbume7 h1,article.svelte-1gbume7 h2,article.svelte-1gbume7 h3,article.svelte-1gbume7 h4{color:hsl(221.2, 83.2%, 53.3%);padding-bottom:0.5rem;font-weight:700}article.svelte-1gbume7 h2{font-size:x-large}article.svelte-1gbume7 h3{font-size:larger}article.svelte-1gbume7 h4{font-size:large}article.svelte-1gbume7 img{width:100%;height:auto;margin:1rem 0}article.svelte-1gbume7 a{text-decoration:underline;color:hsl(221.2, 83.2%, 53.3%)}article.svelte-1gbume7 ul{padding-left:20px;margin-bottom:1rem;list-style:disc inside}article.svelte-1gbume7 li{margin-bottom:0.5rem}article.svelte-1gbume7 p{margin-bottom:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<article class="bg-white md:w-[calc(100%-4rem)] max-w-[800px] mx-auto h-fit p-6 rounded-md shadow-sm border svelte-1gbume7"><h1>${escape(data.article.title)}</h1> <!-- HTML_TAG_START -->${data.article.content}<!-- HTML_TAG_END --> </article>`;
});
export {
  Page as default
};
