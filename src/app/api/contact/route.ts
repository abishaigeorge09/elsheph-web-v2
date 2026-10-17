import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { contactSchema, MIN_FILL_MS } from "@/lib/schemas";

/**
 * General contact messages. The only path to the `contacts` table; same
 * trap behaviour as the university route — quiet refusals for bots, usable
 * errors for humans.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    if (parsed.error.issues.some((issue) => issue.path[0] === "company")) {
      return NextResponse.json({ ok: true });
    }
    const message =
      parsed.error.issues[0]?.message ?? "Check the form and try again";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (Date.now() - parsed.data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;

  /* Primary path: the SECURITY DEFINER function guarded by
     FORM_SUBMIT_SECRET (the 0001 migration). Fallback: direct insert, which
     only works BEFORE the migration revokes anon access — so the form works
     in both database states and the lockdown needs no code deploy. */
  const { error: rpcError } = await supabaseServer.rpc("submit_contact", {
    p_name: name,
    p_email: email,
    p_message: message,
    p_secret: process.env.FORM_SUBMIT_SECRET ?? "",
  });

  if (rpcError) {
    const { error } = await supabaseServer
      .from("contacts")
      .insert([{ name, email, message }]);
    if (error) {
      console.error(
        "contacts write failed:",
        rpcError.message,
        "/",
        error.message,
      );
      return NextResponse.json(
        { error: "Something went wrong. Please try again or email us." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
