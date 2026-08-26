import Link from "next/link";
import { requireUser } from "@/lib/cms/auth";
import { signOut } from "../actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Pages" },
  { href: "/admin/global", label: "Global" },
  { href: "/admin/media", label: "Media Library" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireUser();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-200">
          <p className="font-semibold text-slate-900">Lumina CMS</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{profile.email}</p>
          <span className="inline-block mt-2 text-[11px] uppercase tracking-wide font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
            {profile.role}
          </span>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          {profile.role === "admin" && (
            <Link
              className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              href="/admin/users"
            >
              Users
            </Link>
          )}
        </nav>
        <form action={signOut} className="p-3 border-t border-slate-200">
          <button
            className="w-full text-sm text-slate-600 hover:text-slate-900 text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
