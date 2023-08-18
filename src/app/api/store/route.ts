import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const { email, username, hashedPassword } = res;

  const result = await prisma.user.create({
    data: {
      email,
      username,
      hashedPassword,
    },
  });

  return NextResponse.json({ email, username, hashedPassword });
}
