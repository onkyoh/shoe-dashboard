import { createBrowserClient, isBrowser, parse } from "@supabase/ssr";
const load = async ({ fetch, data, depends }) => {
  depends("supabase:auth");
  const supabase = createBrowserClient(
    "https://lktszkbfrvocjywgeulp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdHN6a2JmcnZvY2p5d2dldWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1MjQzMDMsImV4cCI6MjAyNTEwMDMwM30.9JZFJ1wxFG6EmgD6bDqSoEAk0kkGMK288LYS6cHnxUg",
    {
      global: {
        fetch
      },
      cookies: {
        get(key) {
          if (!isBrowser()) {
            return JSON.stringify(data.session);
          }
          const cookie = parse(document.cookie);
          return cookie[key];
        }
      }
    }
  );
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return { supabase, session, user: data.user, group: data.group };
};
export {
  load
};
