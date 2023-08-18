import { prisma } from "../db";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "bananaphone@gmail.com1",
      username: "BananaPhone1",
      hashedPassword: "HashedPassword11",
      avatar: "/public/coffee_photo.jpg",
      role: "BASIC",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
