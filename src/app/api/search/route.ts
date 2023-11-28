
import { prisma } from "../../../../db";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// export default async function fetchFilteredStores(
//   { query }: { query: string }
// ) {
//   // Perform a search query based on the provided term
//   const result = await prisma.store.findMany({
//     where: {
//       name: {
//         contains: query,
//         mode: "insensitive", // Case-insensitive search
//       },
//     },
//   });

//   return result
// }

export async function GET(
    request: NextRequest,
    // response: NextResponse
) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (typeof query !== 'string') {
        throw new Error("Invalid request")
    }

    // console.log(query)
    const result = await prisma.store.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive", // Case-insensitive search
            },
        },
        select: {
            id: true,
            name: true,
        }
    });

    // res.status(200).json({ result })
    // console.log(result)
    return NextResponse.json(
        result
    )
}