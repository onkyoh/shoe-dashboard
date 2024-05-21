import { a as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, v as validate_component, e as escape } from "./ssr.js";
import { z } from "zod";
import "./client.js";
import { s as superForm, z as zodClient } from "./zod.js";
import "just-clone";
import "ts-deepmerge";
import "./index.js";
import "devalue";
import "memoize-weak";
import { t as toast } from "./Toaster.svelte_svelte_type_style_lang.js";
import { F as Form_field, C as Control, a as Form_field_errors } from "./index5.js";
import { T as Textarea } from "./textarea.js";
import { F as Form_button } from "./form-button.js";
const noteSchema = z.object({
  content: z.string().min(10, "Note must be at least 10 characters.").max(1e3, "Note must be at most 1000 characters.")
});
const NoteForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $formData, $$unsubscribe_formData;
  let $submitting, $$unsubscribe_submitting;
  let { dataForm } = $$props;
  let { shoe } = $$props;
  let { closeDialog } = $$props;
  const form = superForm(dataForm, {
    validators: zodClient(noteSchema),
    onUpdated({ form: f }) {
      if (!f.valid && f.message) {
        toast.error(f.message);
      }
      if (f.valid) {
        toast.success("Note created successfully!");
        closeDialog();
      }
    },
    onSubmit({ formData: formData2 }) {
      formData2.set("shoe_id", shoe.id);
      formData2.set("shoe_name", shoe.name);
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
  if ($$props.shoe === void 0 && $$bindings.shoe && shoe !== void 0)
    $$bindings.shoe(shoe);
  if ($$props.closeDialog === void 0 && $$bindings.closeDialog && closeDialog !== void 0)
    $$bindings.closeDialog(closeDialog);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form method="POST" action="?/create" class="flex h-full flex-col gap-2">${validate_component(Form_field, "Form.Field").$$render(
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
              return `${validate_component(Textarea, "Textarea").$$render(
                $$result,
                Object.assign(
                  {},
                  attrs,
                  {
                    placeholder: "Your notes about this shoe..."
                  },
                  {
                    class: "flex-grow resize-none p-4 min-h-64"
                  },
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
        return `Create Note`;
      }
    })}</form>`;
  } while (!$$settled);
  $$unsubscribe_formData();
  $$unsubscribe_submitting();
  return $$rendered;
});
export {
  NoteForm as N,
  noteSchema as n
};
