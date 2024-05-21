import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import "clsx";
import "../../../../chunks/client.js";
import { C as Card_header } from "../../../../chunks/card-header.js";
import { C as Card_title } from "../../../../chunks/card-title.js";
import { L as Link } from "../../../../chunks/Link.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full max-w-[600px]" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "space-y-1" }, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
            default: () => {
              return `Verify Your Email`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "grid gap-4" }, {}, {
        default: () => {
          return `<p data-svelte-h="svelte-1rvf6r0">We&#39;ve sent you an verification email. Please check your inbox and spam folders
            and click the link within the email to confirm your account.</p> <p>Didn&#39;t receive an email? 
            ${validate_component(Link, "Link").$$render($$result, { href: "/auth/resend-verification" }, {}, {
            default: () => {
              return `Request another verification email.`;
            }
          })}</p>`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
