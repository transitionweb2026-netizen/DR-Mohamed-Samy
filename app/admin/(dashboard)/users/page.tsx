import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/cms/auth";
import UsersTable from "@/components/admin/UsersTable";
import { inviteUser, removeUser, updateUserRole } from "./actions";
import type { Profile } from "@/lib/cms/types";

export default async function UsersPage() {
  const me = await requireAdmin();
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at");

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Users</h1>
      <p className="text-sm text-slate-500 mb-8">
        Admins manage content, SEO, media, and other users. Editors manage content and media only.
      </p>
      <UsersTable
        currentUserId={me.id}
        onInvite={inviteUser}
        onRemove={removeUser}
        onUpdateRole={updateUserRole}
        profiles={(profiles ?? []) as Profile[]}
      />
    </div>
  );
}
