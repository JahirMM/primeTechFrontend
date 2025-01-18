import { jwtVerify } from "jose";

export async function verifyJWT(token: string): Promise<boolean> {
  try {
    const secretKey = new Uint8Array(
      Buffer.from(process.env.NEXT_SECRET_TOKEN_KEY || "", "base64")
    );

    await jwtVerify(token, secretKey);
    return true;
  } catch {
    return false;
  }
}
