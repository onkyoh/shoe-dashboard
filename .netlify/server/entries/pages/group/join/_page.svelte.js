import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import "clsx";
import "../../../../chunks/client.js";
import { C as Card_title } from "../../../../chunks/card-title.js";
import { L as Link } from "../../../../chunks/Link.js";
import { S as Separator } from "../../../../chunks/separator.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "p-2 text-center" }, {}, {
    default: () => {
      return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-4xl" }, {}, {
        default: () => {
          return `Success`;
        }
      })} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `Congrats ${escape(data.name)}! You have successfully joined a group. Follow the link to head on over to the ${validate_component(Link, "Link").$$render($$result, { href: "/group" }, {}, {
            default: () => {
              return `group page.`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
