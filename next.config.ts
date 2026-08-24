import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// This project lives inside a subdirectory of the user's Desktop, which
// also contains an unrelated Next.js project (with its own lockfile).
// Turbopack's automatic workspace-root detection picks up that outer
// lockfile and tries to resolve/bundle files from it. Pinning the root
// here keeps the build scoped to this project only.
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
