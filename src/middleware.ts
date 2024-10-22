import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales, pathnames } from "./i18n";

export default createMiddleware({
  locales,

  defaultLocale,

  localePrefix,

  pathnames,

  localeDetection: false,
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // everything in the `/api` folder, _next, _vercel and public directories
  matcher: ["/((?!api|_next|_vercel|public|.*\\..*).*)"],
};
