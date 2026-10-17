import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * The SERVER-side Supabase client — the only place the app talks to the
 * database. No browser bundle imports Supabase anymore; every write goes
 * through an API route that validates first.
 *
 * Key selection:
 * - `SUPABASE_SERVICE_ROLE_KEY` (server env, never NEXT_PUBLIC_) when
 *   present. This is the end state: RLS revokes anon INSERT entirely and
 *   only this server can write.
 * - Falls back to the anon key so the forms keep working during the
 *   interim window before the service key is provisioned and the revoke
 *   migration runs. The fallback changes nothing about security by itself —
 *   the migration is what closes the hole — but it means the code needs no
 *   second deploy when the key lands.
 *
 * `import "server-only"` makes any accidental client import a build error.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error("Supabase server client: missing URL or key in env");
}

export const supabaseServer = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
