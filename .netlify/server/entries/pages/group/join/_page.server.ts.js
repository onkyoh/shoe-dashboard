import { e as error } from "../../../../chunks/index.js";
const load = async ({ url, locals: { supabase }, parent }) => {
  const link = url.searchParams.get("link");
  if (!link) {
    error(400, "Invite link is invalid");
  }
  const { user } = await parent();
  if (!user) {
    error(401, "Must be logged in");
  }
  if (user.group_id) {
    error(409, "User already in a group");
  }
  const decoded = Buffer.from(link, "base64url").toString();
  const [group_id, timestamp] = decoded.split("|");
  if (parseInt(timestamp) < Date.now() / 1e3) {
    error(410, "Invite link expired");
  }
  const { error: groupError } = await supabase.from("group_members").insert([{ group_id, user_id: user.id, role: "viewer" }]);
  if (groupError) {
    error(500, "There was an error adding the user to the group");
  }
  const { error: groupIdError } = await supabase.from("users").update({ group_id }).eq("id", user.id);
  if (groupIdError) {
    error(500, "There was an error adding the user to the group");
  }
  return {
    name: user.name
  };
};
export {
  load
};
