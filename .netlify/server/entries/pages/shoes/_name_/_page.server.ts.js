import { e as error, f as fail } from "../../../../chunks/index.js";
import { n as noteSchema } from "../../../../chunks/NoteForm.js";
import "just-clone";
import "ts-deepmerge";
import "memoize-weak";
import { a as zod } from "../../../../chunks/zod.js";
import "devalue";
import { s as superValidate, m as message } from "../../../../chunks/superValidate.js";
async function load({ parent, locals: { supabase }, params }) {
  const form = await superValidate(zod(noteSchema));
  const { data: shoe } = await supabase.from("shoes").select("*").eq("name", params.name).single();
  if (!shoe) {
    error(404, {
      message: "Shoe not found",
      link: {
        href: "/shoes",
        label: "Go back to shoes"
      }
    });
  }
  const { user } = await parent();
  if (!user) {
    return { shoe, form, notes: [] };
  }
  const { data: notes } = await supabase.from("notes").select("*,users (name)").eq("shoe_name", params.name).or(`user_id.eq.${user.id}${!user.group_id ? "" : `,group_id.eq.${user.group_id}`}`).order("created_at", { ascending: false });
  return { shoe, form, notes };
}
const actions = {
  create: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, zod(noteSchema));
    if (!form.valid) {
      return message(form, "Note must be between 10 and 1000 characters");
    }
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    if (!user) {
      return message(form, "Must be logged in", { status: 401 });
    }
    const { data: userData } = await supabase.from("users").select("group_id").eq("id", user.id).single();
    if (!userData) {
      return message(form, "Must be logged in", { status: 401 });
    }
    if (!formData.get("shoe_id") || !formData.get("shoe_name")) {
      return message(form, "Error creating note, try again later.", {
        status: 500
      });
    }
    const { error: noteError } = await supabase.from("notes").insert([
      {
        content: form.data.content,
        group_id: userData.group_id,
        shoe_id: formData.get("shoe_id"),
        shoe_name: formData.get("shoe_name")
      }
    ]).select().single();
    if (noteError) {
      return message(form, "Error creating note, try again later.", {
        status: 500
      });
    }
    return {
      form
    };
  },
  edit: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, zod(noteSchema));
    const { supabase, safeGetSession } = event.locals;
    const noteId = formData.get("note_id");
    if (!form.valid && form.errors.content) {
      return fail(400, {
        message: form.errors.content[0] || "Invalid note"
      });
    }
    const { user } = await safeGetSession();
    if (!user) {
      return fail(401, {
        message: "Must be logged in"
      });
    }
    if (!noteId) {
      return fail(500, {
        message: "Update failed, try again later"
      });
    }
    const { data } = await supabase.from("notes").update({ content: form.data.content, created_at: /* @__PURE__ */ new Date() }).eq("id", noteId).select();
    if (!data || data.length === 0) {
      return fail(401, {
        message: "You do not have permission to edit this note."
      });
    }
    return {
      success: true,
      action: "updated"
    };
  },
  delete: async (event) => {
    const formData = await event.request.formData();
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    const noteId = formData.get("note_id");
    if (!user) {
      return fail(401, {
        message: "Must be logged in"
      });
    }
    if (!noteId) {
      return fail(500, {
        message: "Update failed, try again later"
      });
    }
    const { data } = await supabase.from("notes").delete().eq("id", noteId).select();
    if (!data || data.length === 0) {
      return fail(401, {
        message: "You do not have permission to edit this note."
      });
    }
    return { success: true, action: "deleted" };
  }
};
export {
  actions,
  load
};
