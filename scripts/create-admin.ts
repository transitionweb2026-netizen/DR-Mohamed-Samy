import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// Usage: npm run create-admin -- someone@example.com "TemporaryPassword123!"
// Creates (or promotes) the first Admin account. Safe to re-run: if the
// auth user already exists, it just makes sure their profile role is
// "admin" instead of failing.
async function main() {
  const [, , email, password] = process.argv;
  if (!email || !password) {
    console.error('Usage: npm run create-admin -- <email> <password>');
    process.exit(1);
  }

  const supabase = createAdminClient();

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  let userId: string;
  if (createError) {
    if (!createError.message.toLowerCase().includes("already")) throw createError;
    const { data: list, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;
    const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!existing) throw new Error(`User ${email} reportedly exists but could not be found.`);
    userId = existing.id;
    console.log(`User ${email} already exists (id ${userId}) - promoting to admin.`);
  } else {
    userId = created.user.id;
    console.log(`Created user ${email} (id ${userId}).`);
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: userId, email, role: "admin" }, { onConflict: "id" });
  if (profileError) throw profileError;

  console.log(`\n${email} is now an admin. Sign in at /admin/login.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
