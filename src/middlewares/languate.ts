// import {
//   NextResponse,
//   type NextFetchEvent,
//   type NextRequest,
// } from "next/server";
// import acceptLanguage from "accept-language";
// import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";

// acceptLanguage.languages(languages);

// import { CustomMiddleware } from "./chain";

// export function withMiddleware2(middleware: CustomMiddleware) {
//   return async (req: NextRequest, event: NextFetchEvent, res: NextResponse) => {
//     let lng: any;

//     if (req.cookies.has(cookieName)) {
//       lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
//     }

//     if (!lng) {
//       lng = fallbackLng;
//     }

//     // Redirect if lng in path is not supported
//     if (
//       !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//       !req.nextUrl.pathname.startsWith("/_next")
//     ) {
//       return NextResponse.redirect(
//         new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
//       );
//     }

//     if (req.headers.has("referer")) {
//       const refererUrl = new URL(req.headers.get("referer") || "");
//       const lngInReferer = languages.find((l) =>
//         refererUrl.pathname.startsWith(`/${l}`),
//       );
//       const response = NextResponse.next();
//       if (lngInReferer)
//         response.cookies.set(cookieName, lngInReferer, {
//           maxAge: 180 * 24 * 60 * 60 * 1000,
//         });
//       return response;
//     }

//     // Call the next middleware and pass the request and response
//     // return middleware(req, event, res);
//     return event;
//   };
// }

import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";

acceptLanguage.languages(languages);

import { CustomMiddleware } from "./chain";
import { setCookie } from "cookies-next";

export function withMiddleware2(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent, res: NextResponse) => {
    console.log("Executing middleware2");

    let lng: any;

    if (req.cookies.has(cookieName)) {
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    }

    if (!lng) {
      lng = fallbackLng;
    }

    console.log("Detected language:", lng);

    // Redirect if lng in path is not supported
    if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      console.log("Redirecting to preferred language:", lng);
      return NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
      );
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer") || "");
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`),
      );

      if (lngInReferer) {
        console.log("Setting cookie to:", lngInReferer);
        setCookie(cookieName, lngInReferer, {
          maxAge: 180 * 24 * 60 * 60 * 1000,
        });
      }

      return NextResponse.next();
    }

    // Uncomment the line below if you want to call the next middleware
    // return middleware(req, event, res);
    return event;
  };
}
