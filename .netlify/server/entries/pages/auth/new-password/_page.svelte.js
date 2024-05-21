import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "clsx";
import "../../../../chunks/client.js";
import { L as Label, I as Input } from "../../../../chunks/input.js";
import { F as Form_button } from "../../../../chunks/form-button.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import { C as Card_footer } from "../../../../chunks/card-footer.js";
import { C as Card_header } from "../../../../chunks/card-header.js";
import { C as Card_title } from "../../../../chunks/card-title.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { S as Separator } from "../../../../chunks/separator.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let newPassword = "";
  let confirmPassword = "";
  let submitting = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "max-w-[600px] w-full h-fit" }, {}, {
      default: () => {
        return `<form method="POST">${validate_component(Card_header, "Card.Header").$$render($$result, { class: "space-y-1" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
              default: () => {
                return `Set New Password`;
              }
            })} ${validate_component(Card_description, "Card.CardDescription").$$render($$result, {}, {}, {
              default: () => {
                return `Please enter then confirm your new password. Ensure it is a strong password which you can remember.`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "grid gap-4" }, {}, {
          default: () => {
            return `${validate_component(Separator, "Separator").$$render($$result, { class: "mb-2" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { class: "capitalize", for: "newPassword" }, {}, {
              default: () => {
                return `New Password`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "password",
                id: "newPassword",
                required: true,
                value: newPassword
              },
              {
                value: ($$value) => {
                  newPassword = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Label, "Label").$$render(
              $$result,
              {
                class: "capitalize",
                for: "confirmPassword"
              },
              {},
              {
                default: () => {
                  return `Confirm Password`;
                }
              }
            )} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "password",
                id: "confirmPassword",
                required: true,
                value: confirmPassword
              },
              {
                value: ($$value) => {
                  confirmPassword = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Form_button, "Button").$$render($$result, { isSubmitting: submitting }, {}, {
              default: () => {
                return `Update Password`;
              }
            })}`;
          }
        })}</form>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
