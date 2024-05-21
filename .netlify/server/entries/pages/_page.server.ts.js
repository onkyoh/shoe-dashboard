const load = async ({ locals: { supabase }, parent }) => {
  const { data: shoes } = await supabase.from("shoes").select("*").order("created_at", { ascending: false }).range(0, 9);
  const { data: resources } = await supabase.from("resources").select("title, description, created_at, id").order("created_at", { ascending: false });
  try {
    const { user } = await parent();
    if (!user || !user.group_id) {
      throw new Error("No user or group found.");
    }
    const [notes, bulletins] = await Promise.all([
      supabase.from("notes").select(`*, users: users(name)`).eq("group_id", user.group_id).range(0, 9).order("created_at", { ascending: false }).then(({ data }) => data),
      supabase.from("bulletins").select(`*, users: users(name)`).eq("group_id", user.group_id).range(0, 9).order("created_at", { ascending: false }).then(({ data }) => data)
    ]);
    const activity = [...notes || [], ...bulletins || []];
    activity.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : /* @__PURE__ */ new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : /* @__PURE__ */ new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
    return {
      shoes: shoes || [],
      activity,
      resources: resources || []
    };
  } catch (error) {
    return { shoes: shoes || [], activity: [], resources: resources || [] };
  }
};
export {
  load
};
