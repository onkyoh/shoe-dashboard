import { c as create_ssr_component, v as validate_component, f as add_attribute, e as escape } from "./ssr.js";
import { c as cn } from "./utils.js";
import { I as Icon } from "./icon.js";
import { C as Card, a as Card_content } from "./card-content.js";
import { C as Card_footer } from "./card-footer.js";
const ShoeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { shoe } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.shoe === void 0 && $$bindings.shoe && shoe !== void 0)
    $$bindings.shoe(shoe);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: cn("flex h-full flex-col overflow-hidden px-0", className)
    },
    {},
    {
      default: () => {
        return `${validate_component(Card_content, "Card.Content").$$render($$result, { class: "mx-auto w-full flex-grow p-0" }, {}, {
          default: () => {
            return `<img class="w-full"${add_attribute("src", shoe.image, 0)}${add_attribute("alt", shoe.name, 0)}>`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render(
          $$result,
          {
            class: "flex flex-col items-start gap-2 bg-primary px-4 pt-4 text-white"
          },
          {},
          {
            default: () => {
              return `<h3 class="text-lg font-semibold">${escape(shoe.name)}</h3> <p class="flex items-center gap-2">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "mingcute:shoe-fill",
                  class: "text-2xl"
                },
                {},
                {}
              )}${escape(shoe.category)}</p> <p class="flex items-center gap-2">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "material-symbols:weight",
                  class: "text-2xl"
                },
                {},
                {}
              )}${escape(shoe.weight)} oz.</p> <p class="flex items-end gap-2">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "mdi:slope-downhill",
                  class: "text-2xl"
                },
                {},
                {}
              )}${escape(shoe.drop)}mm</p>`;
            }
          }
        )}`;
      }
    }
  )}`;
});
export {
  ShoeCard as S
};
