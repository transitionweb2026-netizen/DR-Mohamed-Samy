"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AppRole, Profile } from "@/lib/cms/types";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

export default function UsersTable({
  profiles,
  currentUserId,
  onInvite,
  onUpdateRole,
  onRemove,
}: {
  profiles: Profile[];
  currentUserId: string;
  onInvite: (email: string, password: string, role: AppRole) => Promise<{ ok: boolean; error?: string }>;
  onUpdateRole: (id: string, role: AppRole) => Promise<{ ok: boolean; error?: string }>;
  onRemove: (id: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppRole>("editor");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await onInvite(email, password, role);
      if (result.ok) {
        setEmail("");
        setPassword("");
        setRole("editor");
        router.refresh();
      } else {
        setError(result.error ?? "Failed to invite user.");
      }
    });
  }

  function handleRoleChange(id: string, newRole: AppRole) {
    startTransition(async () => {
      const result = await onUpdateRole(id, newRole);
      if (result.ok) router.refresh();
      else setError(result.error ?? "Failed to update role.");
    });
  }

  function handleRemove(profile: Profile) {
    if (!confirm(`Remove ${profile.email}'s access? This can't be undone.`)) return;
    startTransition(async () => {
      const result = await onRemove(profile.id);
      if (result.ok) router.refresh();
      else setError(result.error ?? "Failed to remove user.");
    });
  }

  return (
    <div className="space-y-8">
      <form className="bg-white border border-slate-200 rounded-2xl p-6" onSubmit={handleInvite}>
        <h2 className="font-medium text-slate-900 mb-4">Invite a user</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            className={inputClass}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
          <input
            className={inputClass}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Temporary password"
            required
            type="text"
            value={password}
          />
          <select className={inputClass} onChange={(e) => setRole(e.target.value as AppRole)} value={role}>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        <button
          className="mt-4 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Working..." : "Invite"}
        </button>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr className="border-b border-slate-100 last:border-0" key={profile.id}>
                <td className="px-5 py-3 text-slate-900">
                  {profile.email}
                  {profile.id === currentUserId && <span className="text-slate-400"> (you)</span>}
                </td>
                <td className="px-5 py-3">
                  <select
                    className="rounded-md border border-slate-300 px-2 py-1 text-sm disabled:opacity-60"
                    disabled={profile.id === currentUserId || isPending}
                    onChange={(e) => handleRoleChange(profile.id, e.target.value as AppRole)}
                    value={profile.role}
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    className="text-xs text-red-600 hover:underline disabled:opacity-40"
                    disabled={profile.id === currentUserId || isPending}
                    onClick={() => handleRemove(profile)}
                    type="button"
                  >
                    Remove access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
