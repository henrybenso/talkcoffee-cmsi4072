import { prisma } from "../../../../../db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    const result = await prisma.store.findUnique({
        where: {
            id: id

        },
        include: {
            avatar: true,
            images: true,
            serviceTypes: true,
            serviceHours: true
        }
    });
    // console.log(result)
    return Response.json(result);
}