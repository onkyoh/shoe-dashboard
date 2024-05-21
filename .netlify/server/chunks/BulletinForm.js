import { a as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, v as validate_component, g as each, e as escape } from "./ssr.js";
import { z } from "zod";
import "./client.js";
import { s as superForm, z as zodClient } from "./zod.js";
import "just-clone";
import "ts-deepmerge";
import "./index.js";
import "devalue";
import "memoize-weak";
import { F as Form_field, C as Control, a as Form_field_errors } from "./index5.js";
import { I as Input } from "./input.js";
import { C as Card, a as Card_content } from "./card-content.js";
import { C as Card_description } from "./card-description.js";
import { C as Card_footer } from "./card-footer.js";
import { C as Card_header } from "./card-header.js";
import { C as Card_title } from "./card-title.js";
import { t as toast } from "./Toaster.svelte_svelte_type_style_lang.js";
import { F as Form_label } from "./form-label.js";
import { F as Form_button } from "./form-button.js";
import { T as Textarea } from "./textarea.js";
import "./index3.js";
import { P as PRIORITY_MAP } from "./constants.js";
import { B as Button } from "./button.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
const groupSchema = z.object({ name: z.string().min(3).max(30) });
const Create = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $formData, $$unsubscribe_formData;
  let $submitting, $$unsubscribe_submitting;
  let { dataForm } = $$props;
  const form = superForm(dataForm, {
    validators: zodClient(groupSchema),
    onUpdated({ form: f }) {
      if (!f.valid && f.message) {
        toast.error(f.message);
      }
    }
  });
  const { form: formData, enhance, submitting } = form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  if ($$props.dataForm === void 0 && $$bindings.dataForm && dataForm !== void 0)
    $$bindings.dataForm(dataForm);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full max-w-[600px]" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "space-y-1" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
              default: () => {
                return `Create a Group`;
              }
            })} ${validate_component(Card_description, "Card.CardDescription").$$render($$result, {}, {}, {
              default: () => {
                return `Get started with a group to share and learn everything running shoes!`;
              }
            })}`;
          }
        })} <form method="POST" action="?/createGroup">${validate_component(Card_content, "Card.CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "name" }, {}, {
              default: () => {
                return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
                  default: ({ attrs }) => {
                    return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "capitalize" }, {}, {
                      default: () => {
                        return `Group Name`;
                      }
                    })} ${validate_component(Input, "Input").$$render(
                      $$result,
                      Object.assign({}, attrs, { type: "text" }, { value: $formData.name }),
                      {
                        value: ($$value) => {
                          $formData.name = $$value;
                          $$settled = false;
                        }
                      },
                      {}
                    )}`;
                  }
                })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
              }
            })}`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Form_button, "Form.Button").$$render($$result, { isSubmitting: $submitting }, {}, {
              default: () => {
                return `Create`;
              }
            })}`;
          }
        })}</form>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_formData();
  $$unsubscribe_submitting();
  return $$rendered;
});
const EXPIRY_MAP = {
  Day: 1e3 * 60 * 60 * 24,
  Week: 1e3 * 60 * 60 * 24 * 7,
  Month: 1e3 * 60 * 60 * 24 * 30,
  Never: 1e3 * 60 * 60 * 24 * 30 * 12 * 5
};
const { Object: Object_1 } = globals;
const bulletinSchema = z.object({
  priority: z.number().min(1, "Priority is required").max(3),
  expiryDate: z.number().min(1, "Expiry date is required"),
  // Store expiry as a number that will be ms added to current time
  content: z.string().min(10, "Bulletin must be at least 10 characters.").max(1e3, "Bulletin must be at most 1000 characters.")
});
const BulletinForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $formData, $$unsubscribe_formData;
  let $submitting, $$unsubscribe_submitting;
  let { dataForm } = $$props;
  let { closeDialog } = $$props;
  const form = superForm(dataForm, {
    validators: zodClient(bulletinSchema),
    onUpdated({ form: f }) {
      if (!f.valid && f.message) {
        toast.error(f.message);
      }
      if (f.valid) {
        toast.success("Bulletin created successfully!");
        closeDialog();
      }
    },
    onSubmit({ formData: formData2 }) {
      const currentDate = Date.now();
      formData2.set("priority", $formData["priority"]);
      formData2.set("expiryDate", currentDate + $formData["expiryDate"]);
    },
    taintedMessage: () => {
      return new Promise((resolve) => {
        alert("You have unsaved changes. Are you sure you want to leave?");
      });
    }
  });
  const { form: formData, enhance, submitting } = form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  if ($$props.dataForm === void 0 && $$bindings.dataForm && dataForm !== void 0)
    $$bindings.dataForm(dataForm);
  if ($$props.closeDialog === void 0 && $$bindings.closeDialog && closeDialog !== void 0)
    $$bindings.closeDialog(closeDialog);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form method="POST" action="?/createBulletin" class="flex h-full flex-col gap-2">${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "priority",
        class: "flex flex-grow flex-col gap-2 space-y-0"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Priority:`;
                }
              })} <div class="flex gap-2 flex-wrap">${each([1, 2, 3], (priority) => {
                return `${validate_component(Button, "Button").$$render(
                  $$result,
                  Object_1.assign(
                    {},
                    {
                      variant: $formData.priority === priority ? "outline" : "default"
                    },
                    {
                      class: `border-primary ${PRIORITY_MAP[priority]} flex-grow`
                    },
                    attrs
                  ),
                  {},
                  {}
                )}`;
              })}</div>`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )} ${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "expiryDate",
        class: "flex flex-grow flex-col gap-2 space-y-0"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Expires In:`;
                }
              })} <div class="flex flex-wrap gap-2 w-full">${each(Object.keys(EXPIRY_MAP), (expiresIn) => {
                return `${validate_component(Button, "Button").$$render(
                  $$result,
                  Object_1.assign(
                    {},
                    {
                      variant: $formData.expiryDate === EXPIRY_MAP[expiresIn] ? "default" : "outline"
                    },
                    attrs
                  ),
                  {},
                  {
                    default: () => {
                      return `${escape(expiresIn)} `;
                    }
                  }
                )}`;
              })}</div>`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )} ${validate_component(Form_field, "Form.Field").$$render(
      $$result,
      {
        form,
        name: "content",
        class: "flex flex-grow flex-col gap-2 space-y-0"
      },
      {},
      {
        default: () => {
          return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
            default: ({ attrs }) => {
              return `${validate_component(Form_label, "Form.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Content:`;
                }
              })} ${validate_component(Textarea, "Textarea").$$render(
                $$result,
                Object_1.assign(
                  {},
                  attrs,
                  {
                    placeholder: "Your message to your group..."
                  },
                  { class: "flex-grow resize-none p-4" },
                  { value: $formData.content }
                ),
                {
                  value: ($$value) => {
                    $formData.content = $$value;
                    $$settled = false;
                  }
                },
                {}
              )} <span class="ml-auto text-sm text-muted-foreground">${escape($formData.content?.length || "0")} / 1000</span>`;
            }
          })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
        }
      }
    )} ${validate_component(Form_button, "Form.Button").$$render($$result, { isSubmitting: $submitting }, {}, {
      default: () => {
        return `Create Bulletin`;
      }
    })}</form>`;
  } while (!$$settled);
  $$unsubscribe_formData();
  $$unsubscribe_submitting();
  return $$rendered;
});
export {
  BulletinForm as B,
  Create as C,
  EXPIRY_MAP as E,
  bulletinSchema as b,
  groupSchema as g
};
