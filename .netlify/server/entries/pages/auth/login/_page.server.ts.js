import { f as fail } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import { a as zod } from "../../../../chunks/zod.js";
import "just-clone";
import "ts-deepmerge";
import "devalue";
import { s as superValidate, a as setError } from "../../../../chunks/superValidate.js";
import "memoize-weak";
import { l as loginSchema } from "../../../../chunks/schema.js";
const load = async () => {
  return {
    form: await superValidate(zod(loginSchema))
  };
};
const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const { supabase } = event.locals;
    const { error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
    });
    if (error) {
      return setError(form, error.message);
    }
    return {
      form
    };
  }
};
export {
  actions,
  load
};
