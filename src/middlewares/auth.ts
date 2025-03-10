// import { verifyToken } from "@/utils/auth";
// import {
//   NextResponse,
//   type NextFetchEvent,
//   type NextRequest,
// } from "next/server";

// import { CustomMiddleware } from "./chain";

// export function withMiddleware1(middleware: CustomMiddleware) {
//   return async function (
//     req: NextRequest,
//     event: NextFetchEvent,
//     res: NextResponse,
//   ) {
//     if (req.nextUrl.pathname.includes("dashboard")) {
//       const accessToken = req.cookies.get("access-token")?.value;

//       if (accessToken) {
//         const isTokenVerified = verifyToken(accessToken);
//         if (!isTokenVerified) {
//           return NextResponse.redirect(new URL("/admin/login", req.url));
//         }
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }
//       return NextResponse.redirect(new URL("/admin/login", req.url));
//     }
//     return middleware(req, event, res);
//   };
// }

import { verifyToken } from "@/utils/auth";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { CustomMiddleware } from "./chain";

export function withMiddleware1(middleware: CustomMiddleware) {
  return async function (
    req: NextRequest,
    event: NextFetchEvent,
    res: NextResponse,
  ) {
    console.log("Executing middleware1");

    if (req.nextUrl.pathname.includes("dashboard")) {
      const accessToken = req.cookies.get("access-token")?.value;

      if (accessToken) {
        const isTokenVerified = verifyToken(accessToken);
        if (!isTokenVerified) {
          console.log("Redirecting to /admin/login due to invalid token");
          return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        console.log("Redirecting to /dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      console.log("Redirecting to /admin/login due to missing token");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    console.log("Invoking next middleware");
    return middleware(req, event, res);
  };
}
