const load = async ({ locals: { supabase } }) => {
  const { data: resources } = await supabase.from("resources").select("title, description, created_at, id").order("created_at", { ascending: false });
  return {
    resources: resources || []
  };
};
export {
  load
};
