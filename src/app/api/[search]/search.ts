import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const searchTerm = req.query.term as string;

  try {
    // Perform a search query based on the provided term
    const result = await prisma.store.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    return res.json({ result });
  } catch (error) {
    console.error("Error searching for stores:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
