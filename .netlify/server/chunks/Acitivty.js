import { c as create_ssr_component, f as add_attribute, e as escape } from "./ssr.js";
import { P as PRIORITY_MAP } from "./constants.js";
import { c as cn, f as formatName, a as formatCreatedAt } from "./utils.js";
const Acitivty = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let typedActivity;
  let { activity } = $$props;
  if ($$props.activity === void 0 && $$bindings.activity && activity !== void 0)
    $$bindings.activity(activity);
  typedActivity = {
    ...activity,
    type: activity.hasOwnProperty("priority") ? "bulletin" : "note"
  };
  return `<a${add_attribute(
    "href",
    typedActivity.type === "note" ? `/shoes/${typedActivity.shoe_name}` : "/group",
    0
  )} class="flex flex-col gap-2 overflow-x-hidden bg-white rounded-lg p-4 border-2 hover:border-primary h-fit">${typedActivity.type === "bulletin" ? `<span${add_attribute("class", cn("relative left-[-10%] top-[-1rem] h-8 w-[120%] mb-[-0.5rem]", PRIORITY_MAP[typedActivity.priority]), 0)}></span>` : `${typedActivity.type === "note" ? `<p class="font-medium">${escape(typedActivity.shoe_name)}</p>` : ``}`} <div class="flex justify-between"><span class="text-sm text-muted-foreground">${escape(formatName(typedActivity.users.name))}</span> <span class="text-sm text-muted-foreground">${escape(formatCreatedAt(typedActivity.created_at))}</span></div> <p class="line-clamp-6 text-muted-foreground">${escape(typedActivity.content)}</p></a>`;
});
export {
  Acitivty as A
};
