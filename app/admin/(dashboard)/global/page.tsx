import { redirect } from "next/navigation";

// "global" is just another slug in the `pages` table (Navbar/Footer/shared
// contact info) - reuse the exact same section editor instead of a
// parallel implementation.
export default function GlobalRedirectPage() {
  redirect("/admin/pages/global");
}
