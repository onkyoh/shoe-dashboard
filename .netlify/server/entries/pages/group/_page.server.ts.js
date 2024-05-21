import { e as error, f as fail } from "../../../chunks/index.js";
import "devalue";
import { s as superValidate, m as message } from "../../../chunks/superValidate.js";
import { g as groupSchema, b as bulletinSchema } from "../../../chunks/BulletinForm.js";
import "just-clone";
import "ts-deepmerge";
import "memoize-weak";
import { a as zod } from "../../../chunks/zod.js";
const load = async ({ parent, locals: { supabase } }) => {
  const groupForm = await superValidate(zod(groupSchema));
  const bulletinForm = await superValidate(zod(bulletinSchema));
  try {
    const { user } = await parent();
    if (!user || !user.group_id) {
      throw new Error("No user or group return defaults");
    }
    const [group, groupMembers, bulletins, notes] = await Promise.all([
      supabase.from("groups").select("*").eq("id", user.group_id).single().then(({ data }) => data),
      supabase.from("group_members").select("*, users (name)").eq("group_id", user.group_id).then(({ data }) => data),
      supabase.from("bulletins").select("*,	users: users(name)").eq("group_id", user.group_id).order("created_at", { ascending: false }).then(({ data }) => data),
      supabase.from("notes").select("*,	users: users(name)").eq("group_id", user.group_id).range(0, 9).order("created_at", { ascending: false }).then(({ data }) => data)
    ]);
    const shareLink = groupMembers?.find(
      (member) => member.user_id === user.id && ["admin", "owner"].includes(member.role)
    ) ? generateShareLink(user.group_id) : "";
    return {
      groupForm,
      bulletinForm,
      group,
      shareLink,
      groupMembers: groupMembers || [],
      bulletins: bulletins || [],
      notes: notes || []
    };
  } catch (err) {
    error(401, {
      message: "Must be logged in",
      link: {
        href: "/auth/login",
        label: "Sign in or create an account to start or join a group."
      }
    });
  }
};
function generateShareLink(groupId) {
  const combinedString = `${groupId}|${Date.now() / 1e3 + 60 * 60 * 24 * 7}`;
  return `${"localhost:5173"}/group/join?link=${Buffer.from(combinedString).toString("base64url")}`;
}
const actions = {
  createGroup: async (event) => {
    const groupForm = await superValidate(event, zod(groupSchema));
    if (!groupForm.valid) {
      return message(groupForm, "Group name is not valid");
    }
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    if (!user) {
      return message(groupForm, "Must be logged in", { status: 401 });
    }
    const { error: error2 } = await supabase.rpc("create_group_and_link_user", {
      user_id: user.id,
      group_name: groupForm.data.name
    });
    if (error2) {
      return message(groupForm, "Something went wrong, try again later", { status: 500 });
    }
    return {
      groupForm
    };
  },
  createBulletin: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, zod(bulletinSchema));
    if (!form.valid) {
      return message(form, "Invalid bulletin");
    }
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    if (!user) {
      return message(form, "Must be logged in", { status: 401 });
    }
    const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single();
    if (!userData) {
      return message(form, "Must be logged in", { status: 401 });
    }
    const { error: bulletinError } = await supabase.from("bulletins").insert([
      {
        content: form.data.content,
        group_id: userData.group_id,
        priority: form.data.priority,
        // Assuming priority is in the form
        delete_at: new Date(form.data.expiryDate)
      }
    ]).select().single();
    if (bulletinError) {
      return message(form, "Error creating bulletin, try again later.", {
        status: 500
      });
    }
    return {
      form
    };
  },
  editBulletin: async (event) => {
    const formData = await event.request.formData();
    const form = await superValidate(formData, zod(bulletinSchema));
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    const bulletinId = formData.get("bulletin_id");
    if (!form.valid && form.errors.content) {
      return fail(400, {
        message: form.errors.content[0] || "Invalid bulletin"
      });
    }
    if (!user) {
      return fail(401, {
        message: "Must be logged in"
      });
    }
    if (!bulletinId) {
      return fail(500, {
        message: "An unknown error occured"
      });
    }
    const { data } = await supabase.from("bulletins").update({
      content: form.data.content,
      priority: form.data.priority,
      // Update priority
      delete_at: new Date(form.data.expiryDate),
      // Update delete_at based on expiryDate
      created_at: /* @__PURE__ */ new Date()
    }).eq("id", bulletinId).select();
    if (!data || data?.length < 1) {
      return fail(401, {
        message: "You do not have permission to edit this bulletin"
      });
    }
    return {
      success: true,
      action: "updated"
    };
  },
  deleteBulletin: async (event) => {
    const formData = await event.request.formData();
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    const bulletinId = formData.get("bulletin_id");
    if (!user) {
      return fail(401, {
        message: "Must be logged in"
      });
    }
    if (!bulletinId) {
      return fail(501, {
        message: "An unknown error occured"
      });
    }
    const { data } = await supabase.from("bulletins").delete().eq("id", bulletinId).select();
    if (!data || data?.length < 1) {
      return fail(401, {
        message: "You do not have permission to delete this bulletin"
      });
    }
    return { success: true, action: "deleted" };
  },
  updateRoles: async (event) => {
    const formData = await event.request.formData();
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    const members = formData.get("members");
    let parsedMembers;
    if (!user)
      return fail(401, { message: "Must be logged in" });
    if (!members || typeof members !== "string")
      return fail(500, { message: "An unknown error occurred" });
    try {
      parsedMembers = JSON.parse(members);
    } catch (parseError) {
      return fail(500, { message: "An unknown error occurred" });
    }
    const updatedMembers = [];
    const removedMembers = [];
    parsedMembers?.forEach((member) => {
      if (member.role === "remove") {
        removedMembers.push(member);
      } else {
        const { users, ...rest } = member;
        updatedMembers.push(rest);
      }
    });
    const { error: upsertError } = await supabase.from("group_members").upsert(updatedMembers, { onConflict: "id" });
    if (upsertError) {
      return fail(500, { message: "An unknown error occurred during update" });
    }
    const { error: deleteError } = await supabase.from("group_members").delete().in(
      "id",
      removedMembers.map((member) => member.id)
    );
    if (deleteError) {
      return fail(500, { message: "An unknown error occurred during removal" });
    }
    return { success: true };
  },
  leaveGroup: async (event) => {
    const { supabase, safeGetSession } = event.locals;
    const { user } = await safeGetSession();
    if (!user)
      return fail(401, { message: "Must be logged in" });
    const { error: error2 } = await supabase.from("group_members").delete().eq("user_id", user.id);
    if (error2) {
      return fail(500, { message: "An unknown error occurred during removal" });
    }
    return { success: true };
  }
};
export {
  actions,
  load
};
