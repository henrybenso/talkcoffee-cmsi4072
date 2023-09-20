import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

// export async function GET() {
//   // const requestHeaders: HeadersInit = new Headers();
//   // requestHeaders.set("Content-Type", "API-Key");
//   // const res = await fetch("", {
//   //   // headers: requestHeaders,
//   // });
//   // const result = await prisma.user.findUnique({
//   //   where
//   // })
//   const data = await res.json();

//   return NextResponse.json({ data });
// }

export const RoleTypes: {
  BASIC: "BASIC";
  PREMIUM: "PREMIUM";
  ADMIN: "ADMIN";
} = {
  BASIC: "BASIC",
  PREMIUM: "PREMIUM",
  ADMIN: "ADMIN",
};

export type RoleTypes = (typeof RoleTypes)[keyof typeof RoleTypes];

type UserType = {
  email: string;
  username: string;
  beans: number;
  passwordHash: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  role: RoleTypes;
  birthDate: Date;
};

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const { email, username, passwordHash, avatar }: UserType = res;

  const result = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      ,

    },
  });

  return NextResponse.json({ email, username, passwordHash });
}
