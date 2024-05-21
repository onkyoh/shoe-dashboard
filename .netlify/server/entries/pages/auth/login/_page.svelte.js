import { a as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, g as each, e as escape } from "../../../../chunks/ssr.js";
import { F as Form_field, C as Control, a as Form_field_errors } from "../../../../chunks/index5.js";
import { I as Input } from "../../../../chunks/input.js";
import { B as Button } from "../../../../chunks/button.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import "clsx";
import "../../../../chunks/client.js";
import { C as Card_footer } from "../../../../chunks/card-footer.js";
import { C as Card_header } from "../../../../chunks/card-header.js";
import { C as Card_title } from "../../../../chunks/card-title.js";
import { l as loginSchema } from "../../../../chunks/schema.js";
import { s as superForm, z as zodClient } from "../../../../chunks/zod.js";
import "just-clone";
import "ts-deepmerge";
import "../../../../chunks/index.js";
import "devalue";
import "memoize-weak";
import { t as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { L as Link } from "../../../../chunks/Link.js";
import { F as Form_label } from "../../../../chunks/form-label.js";
import { F as Form_button } from "../../../../chunks/form-button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $formData, $$unsubscribe_formData;
  let $constraints, $$unsubscribe_constraints;
  let $submitting, $$unsubscribe_submitting;
  let { data } = $$props;
  const form = superForm(data.form, {
    validators: zodClient(loginSchema),
    onUpdated({ form: f }) {
      if (f.valid) {
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        if (f.errors._errors) {
          f.errors._errors.forEach((message) => {
            toast.error(message);
          });
        } else {
          toast.error("An error occured, try again later");
        }
      }
    }
  });
  const { form: formData, enhance, submitting, constraints } = form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => $constraints = value);
  const fields = ["email", "password"];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full max-w-[600px]" }, {}, {
      default: () => {
        return `<form method="POST">${validate_component(Card_header, "Card.Header").$$render($$result, { class: "space-y-1" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
              default: () => {
                return `Welcome Back!`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "grid gap-4" }, {}, {
          default: () => {
            return `<div class="grid">${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
              default: () => {
                return `<svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
        Google`;
              }
            })}</div> <div class="relative" data-svelte-h="svelte-pqngnv"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-card px-2 text-muted-foreground">Or continue with</span></div></div> ${each(fields, (field) => {
              return `${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: field }, {}, {
                default: () => {
                  return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
                    default: ({ attrs }) => {
                      return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "capitalize" }, {}, {
                        default: () => {
                          return `${escape(field)}`;
                        }
                      })} ${validate_component(Input, "Input").$$render(
                        $$result,
                        Object.assign({}, attrs, { type: field }, $constraints[field], { value: $formData[field] }),
                        {
                          value: ($$value) => {
                            $formData[field] = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )} `;
                    }
                  })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})} `;
                }
              })}`;
            })}`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, { class: "grid gap-2" }, {}, {
          default: () => {
            return `${validate_component(Form_button, "Form.Button").$$render($$result, { isSubmitting: $submitting }, {}, {
              default: () => {
                return `Log In`;
              }
            })} ${validate_component(Link, "Link").$$render(
              $$result,
              {
                href: "/auth/reset-password",
                class: "text-center text-sm"
              },
              {},
              {
                default: () => {
                  return `Forgot Password?`;
                }
              }
            )}`;
          }
        })}</form>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_formData();
  $$unsubscribe_constraints();
  $$unsubscribe_submitting();
  return $$rendered;
});
export {
  Page as default
};
