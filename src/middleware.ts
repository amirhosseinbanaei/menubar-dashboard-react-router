import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";
import { verifyToken } from "./utils/auth";

acceptLanguage.languages(languages);
const PUBLIC_FILE = /\.(.*)$/;

export const config = {
  matcher: "/:locale*",
  // matcher: ["/((?!api|sw.js).*)"],
};

export async function middleware(req: NextRequest) {
  let lng: any;

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  if (!lng) {
    lng = fallbackLng;
  }

  // Redirect if lng in path is not supported
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  } else {
    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      return NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
      );
    }
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer)
      response.cookies.set(cookieName, lngInReferer, {
        maxAge: 180 * 24 * 60 * 60 * 1000,
      });
    return response;
  }

  if (req.nextUrl.pathname.includes("dashboard")) {
    const accessToken = req.cookies.get("access-token")?.value;
    if (accessToken) {
      const isTokenVerified = await verifyToken(accessToken);
      if (!isTokenVerified) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}
