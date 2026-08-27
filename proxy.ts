import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// The /admin CMS dashboard is intentionally outside next-intl's locale
// routing (it's an internal tool, not a translated public page), so it's
// handled by a completely separate branch here rather than going through
// createMiddleware(routing) at all.
async function handleAdminAuth(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refreshes the session cookie if needed - required by @supabase/ssr so
  // Server Components/Actions downstream see a valid, current session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

// The CMS lives at /admin, not /en/admin, /ar/admin, etc. - a locale
// prefix in front of it is an easy, understandable mistake (every other
// route on the site does need one), so redirect instead of letting it
// 404 the way an unrecognized path normally would.
const LOCALE_PREFIXED_ADMIN = new RegExp(`^/(?:${routing.locales.join("|")})(/admin(?:/.*)?)$`);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localePrefixedAdminMatch = pathname.match(LOCALE_PREFIXED_ADMIN);
  if (localePrefixedAdminMatch) {
    const url = request.nextUrl.clone();
    url.pathname = localePrefixedAdminMatch[1]!;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    return handleAdminAuth(request);
  }
  return intlMiddleware(request);
}

export const config = {
  // Match every route except static files, Next.js internals, and API routes.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
