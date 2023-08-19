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

interface User {
  email: String;
  username: String;
  hashedPassword: String;
};

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
