import { f as fail, r as redirect } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import { a as zod } from "../../../../chunks/zod.js";
import "just-clone";
import "ts-deepmerge";
import "devalue";
import { s as superValidate, a as setError } from "../../../../chunks/superValidate.js";
import "memoize-weak";
import { r as registerSchema } from "../../../../chunks/schema2.js";
const load = async () => {
  return {
    form: await superValidate(zod(registerSchema))
  };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(registerSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const { supabase } = event.locals;
    const { error } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
      options: {
        emailRedirectTo: "http://localhost:5173/redirect",
        data: {
          name: form.data.name
        }
      }
    });
    if (error) {
      return setError(form, error.message);
    }
    redirect(303, "/auth/verify-email");
  }
};
export {
  actions,
  load
};
