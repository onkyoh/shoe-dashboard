import { a as subscribe } from "../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { C as Card, a as Card_content } from "../../chunks/card-content.js";
import "clsx";
import "../../chunks/client.js";
import { C as Card_title } from "../../chunks/card-title.js";
import { L as Link } from "../../chunks/Link.js";
import { S as Separator } from "../../chunks/separator.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$page.error ? `${validate_component(Card, "Card.Root").$$render($$result, { class: "p-2 text-center" }, {}, {
    default: () => {
      return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-4xl" }, {}, {
        default: () => {
          return `${escape($page.status)}`;
        }
      })} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${escape($page.error.message || "An unexpected error occurred. Please try again.")} <br> ${$page.error.link ? `${validate_component(Link, "Link").$$render($$result, { href: $page.error.link.href }, {}, {
            default: () => {
              return `${escape($page.error.link.label)}`;
            }
          })}` : ``}`;
        }
      })}`;
    }
  })}` : ``}`;
});
export {
  Error as default
};
