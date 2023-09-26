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

export async function UPDATE(request: Request) {
  const res = await request.json();

  const {
    email,
    username,
    avatar,
    firstName,
    lastName,
    age,
    birthDate,
  }: UserType = res;

  const result = prisma.user.update({
    where: {
      email: email,
    },
    data: {
      username: username,
      avatar: avatar != null ? avatar : undefined,
      firstName: firstName != null ? firstName : undefined,
      lastName: lastName != null ? lastName : undefined,
      age: age != null ? age : undefined,
      birthDate: birthDate != null ? birthDate : undefined,
    },
  });

  return NextResponse.json({ result });
}
