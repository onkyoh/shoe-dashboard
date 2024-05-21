import { s as setContext, h as hasContext, g as getContext, c as compute_rest_props, o as onDestroy, a as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, h as escape_attribute_value, b as escape_object } from "./ssr.js";
import { c as cn } from "./utils.js";
import { w as writable } from "./index2.js";
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContex(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["opts", "plugins", "api", "orientation", "class"]);
  let { opts = {} } = $$props;
  let { plugins = [] } = $$props;
  let { api = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { class: className = void 0 } = $$props;
  const apiStore = writable(void 0);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  function scrollPrev() {
    api?.scrollPrev();
  }
  function scrollNext() {
    api?.scrollNext();
  }
  function onSelect(api2) {
    if (!api2)
      return;
    canScrollPrev.set(api2.canScrollPrev());
    canScrollNext.set(api2.canScrollNext());
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  setEmblaContex({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit
  });
  function onInit(event) {
    api = event.detail;
    apiStore.set(api);
  }
  onDestroy(() => {
    api?.off("select", onSelect);
  });
  if ($$props.opts === void 0 && $$bindings.opts && opts !== void 0)
    $$bindings.opts(opts);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  {
    orientationStore.set(orientation);
  }
  {
    pluginStore.set(plugins);
  }
  {
    optionsStore.set(opts);
  }
  {
    if (api) {
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
    }
  }
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("relative", className))
      },
      { role: "region" },
      { "aria-roledescription": "carousel" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $$unsubscribe_options;
  let $orientation, $$unsubscribe_orientation;
  let $$unsubscribe_plugins;
  let { class: className = void 0 } = $$props;
  const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_options = subscribe(options, (value) => value);
  $$unsubscribe_plugins = subscribe(plugins, (value) => value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_options();
  $$unsubscribe_orientation();
  $$unsubscribe_plugins();
  return `<div class="overflow-hidden"><div${spread(
    [
      {
        class: escape_attribute_value(cn(
          "flex",
          $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ))
      },
      { "data-embla-container": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Carousel_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $orientation, $$unsubscribe_orientation;
  let { class: className = void 0 } = $$props;
  const { orientation } = getEmblaContext("<Carousel.Item/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_orientation();
  return `<div${spread(
    [
      { role: "group" },
      { "aria-roledescription": "slide" },
      {
        class: escape_attribute_value(cn("min-w-0 shrink-0 grow-0 basis-full", $orientation === "horizontal" ? "pl-4" : "pt-4", className))
      },
      { "data-embla-slide": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Carousel as C,
  Carousel_content as a,
  Carousel_item as b
};
