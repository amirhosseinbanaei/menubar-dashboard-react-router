"use server";
import adminModel from "@/models/adminModel";
import connectToDB from "@/lib/db";
import { generateToken, verifyPassword} from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const loginAction = async (data: {
  username: string;
  password: string;
}) => {
  try {
    connectToDB();

    if (!data.username.trim() || !data.password.trim()) {
      return {
        ok: false,
        message: "Data is not valid !!",
        messageCode: "invalidData",
      };
    }

    const user = await adminModel.findOne({ email: data.username });

    if (!user) {
      return {
        ok: false,
        message: "User not found !!",
        messageCode: "username",
      };
    }

    const isValidPassword = await verifyPassword(data.password, user.password);

    if (!isValidPassword) {
      return {
        ok: false,
        message: "Password is not correct !!",
        messageCode: "password",
      };
    }

    const token = await generateToken({ email: user.email });

    cookies().set({
      name: "access-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 2,
    });

    return {
      ok: true,
      message: "User Logged In Successfully :))",
      messageCode: "success",
    };
  } catch (err) {
    return {
      ok: false,
      message: "UnKnown Internal Server Erorr !!",
      messageCode: "internal",
    };
  }
};

export const logoutAction = () => {
  cookies().set({
    name: "access-token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return {
    ok: true,
    message: "User Logged Out Successfully :))",
    messageCode: "logout",
  };
};

// export const getMe = async () => {
//   try {
//     connectToDB();

//     const accessToken = cookies().get("access-token")?.value;

//     if (accessToken) {
//       const isTokenVerified = await verifyToken(accessToken);
//       if (!isTokenVerified) {
//         return NextResponse.redirect("/admin/login");
//       }
//       return NextResponse.redirect("/dashboard");
//     }
//     return NextResponse.redirect("/admin/login");
//   } catch (error) {
//     return { ok: false, message: "Internal server error !" };
//   }
// };
