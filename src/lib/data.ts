import { prisma } from "../../db";

export default async function fetchFilteredStores(
    { query }: { query: string | undefined }
) {
    // Perform a search query based on the provided term
    if (query === undefined) {
        query = ""
        return []
    }
    const result = await prisma.store.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive", // Case-insensitive search
            },
        },
    });

    return result
}
