import { createServerClient } from "@supabase/ssr";
const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    "https://lktszkbfrvocjywgeulp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdHN6a2JmcnZvY2p5d2dldWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1MjQzMDMsImV4cCI6MjAyNTEwMDMwM30.9JZFJ1wxFG6EmgD6bDqSoEAk0kkGMK288LYS6cHnxUg",
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        /**
         * Note: You have to add the `path` variable to the
         * set and remove method due to sveltekit's cookie API
         * requiring this to be set, setting the path to an empty string
         * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
         */
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: "/" });
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: "/" });
        }
      }
    }
  );
  event.locals.safeGetSession = async () => {
    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      return { session: null, user: null };
    }
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return { session, user };
  };
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    }
  });
};
export {
  handle
};
