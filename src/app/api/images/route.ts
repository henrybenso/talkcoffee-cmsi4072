import { prisma } from "../../../../db";

export default async function handle(req, res) {
  const images = await prisma.store.res.json(images);
}
