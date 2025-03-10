import { SignJWT, jwtVerify } from "jose";
import { compare } from "bcryptjs";

export async function generateToken(payload: any): Promise<any> {
  try {
    const secret = new TextEncoder().encode(process.env.jwtt);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
}

// export const verifyToken = async (token: string) => {
//   try {
//     const validationResult = jwtVerify(token, process.env.privateKey);
//     return validationResult;
//   } catch (err) {
//     console.log("Verify Token Error =>", err);
//     return false;
//   }
// };

export async function verifyToken(token: string): Promise<any> {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.jwtt)
      )
    ).payload;
  } catch (error) {
    return false;
  }
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
