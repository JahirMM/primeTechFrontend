"use server";

import { cookies } from "next/headers";
import { verifyJWT } from "../utils/verifyJWT";

export async function useAuthServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.NEXT_COOKIE_NAME || "jwt");

  if (!token) {
    return false;
  }

  const isValid = await verifyJWT(token.value);

  return isValid;
}
