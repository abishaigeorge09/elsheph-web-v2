import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { universityInquirySchema, MIN_FILL_MS } from "@/lib/schemas";

/**
 * University partnership inquiries. The client component posts here; this
 * route is the only path to the `university_contacts` table.
 *
 * Refusals are deliberately quiet for the traps (a bot learns nothing from
 * a 200) and loud for validation (a human gets a usable message).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const parsed = universityInquirySchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues.find((issue) => issue.path[0] !== "company")
        ?.message ?? "Check the form and try again";
    /* Honeypot filled → pretend success; nothing is stored. */
    if (parsed.error.issues.some((issue) => issue.path[0] === "company")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }

  /* Timing trap: refuse implausibly fast submissions, quietly. */
  if (Date.now() - parsed.data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, university, role, message } = parsed.data;

  /* Primary path: the SECURITY DEFINER function guarded by
     FORM_SUBMIT_SECRET (the 0001 migration). Fallback: direct insert, which
     only works BEFORE the migration revokes anon access — so the form works
     in both database states and the lockdown needs no code deploy. */
  const { error: rpcError } = await supabaseServer.rpc(
    "submit_university_contact",
    {
      p_name: name,
      p_email: email,
      p_university: university,
      p_role: role,
      p_message: message,
      p_secret: process.env.FORM_SUBMIT_SECRET ?? "",
    },
  );

  if (rpcError) {
    const { error } = await supabaseServer
      .from("university_contacts")
      .insert([{ name, email, university, role, message }]);
    if (error) {
      console.error(
        "university_contacts write failed:",
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
