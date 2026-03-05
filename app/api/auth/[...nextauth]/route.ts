import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/options";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = NextAuth(authOptions) as any;

export const GET = handler;
export const POST = handler;
