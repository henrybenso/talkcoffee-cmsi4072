import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export async function GET(userEmail: string) {
  // const requestHeaders: HeadersInit = new Headers();
  // requestHeaders.set("Content-Type", "API-Key");
  // const res = await fetch("", {
  //   // headers: requestHeaders,
  // });
  const result = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  const data = await result.json();

  return NextResponse.json({ data });
}

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
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  role: RoleTypes;
  birthDate: Date;
};

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const {
    email,
    username,
    passwordHash,
    avatar,
    firstName,
    lastName,
    age,
    role,
    birthDate,
  }: UserType = res;

  const result = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      avatar,
      firstName,
      lastName,
      age,
      role,
      birthDate,
    },
  });

  return NextResponse.json({ result });
}

export async function UPDATE(user: UserType) {
  const result = prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      username: user.username,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      birthDate: user.birthDate,
    },
  });
}