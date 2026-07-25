#!/usr/bin/env node
/**
 * Create a NeoHub admin user.
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/create-admin.mjs admin@neohubspaces.in 'StrongPassword123!'
 */
import { createClient } from "@supabase/supabase-js";

const email = process.argv[2];
const password = process.argv[3];
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (createError && !/already/i.test(createError.message)) {
  console.error(createError.message);
  process.exit(1);
}

let userId = created?.user?.id;
if (!userId) {
  const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  userId = list?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
}

if (!userId) {
  console.error("Could not resolve user id");
  process.exit(1);
}

const { error: adminError } = await supabase.from("admin_users").upsert({
  user_id: userId,
  email,
  role: "admin",
});

if (adminError) {
  console.error(adminError.message);
  process.exit(1);
}

console.log(`Admin ready: ${email}`);
