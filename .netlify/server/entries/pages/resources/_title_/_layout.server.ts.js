import { e as error } from "../../../../chunks/index.js";
const load = async ({ locals: { supabase }, params }) => {
  const { data: article } = await supabase.from("resources").select("*").eq("title", params.title).single();
  if (!article) {
    error(404, {
      message: "Article not found",
      link: {
        href: "/resources",
        label: "Go back to resources"
      }
    });
  }
  return {
    article
  };
};
export {
  load
};
