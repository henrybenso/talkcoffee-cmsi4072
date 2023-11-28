import { Days, DineTypes } from "@prisma/client";
import { prisma } from "../db"

async function main() {
    //   const user = await prisma.user.create({
    //     data: {
    //       email: "bananaphone@gmail.com1",
    //       username: "BananaPhone1",
    //       hashedPassword: "HashedPassword11",
    //       avatar: "/public/coffee_photo.jpg",
    //       role: "BASIC",
    //     },
    //   });

    const store = await prisma.store.create({
        data: {
            name: "bananaphone@gmail.com1",
            averageRating: 5,
            ratingCount: 1,
            phoneNumber: "62662234",
            instagramHandle: "asdfasdf",
            avatar: {
                create: {
                    publicId: "test_publicId",
                    format: "test_publicId",
                    version: "test_publicId",
                },
            },
            serviceTypes: {
                create: {
                    sitIn: [DineTypes.CAFE, DineTypes.BAR],
                    takeOut: false,
                    delivery: false,
                    curbsidePickup: false
                }
            },
            serviceHours: {
                create: [{

                    day: Days.SUN,
                    open: "2022-02-17T14:26:43Z",
                    close: "2022-02-17T14:26:43Z"
                },
                {

                    day: Days.MON,
                    open: "2022-02-17T14:26:43Z",
                    close: "2022-02-17T14:26:43Z"
                }
                ]

            }
        },
    });

    console.log(store)


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })



// const result = await prisma.store.create({
//     data: {
//         name,
//         averageRating,
//         ratingCount,
//         phoneNumber,
//         instagramHandle,
//         avatar,
//         // images: {
//         //   createMany: {
//         //     data: imageDatas,
//         //     skipDuplicates: true,
//         //   },
//         // },
//         serviceTypes: {
//             create: {
//                 sitIn: {
//                     sitInValues
//                 },
//                 takeOut: serviceTypes.takeOut,
//                 delivery: serviceTypes.delivery,
//             },
//         },
//         serviceHours: {
//             createMany: {
//                 data:
//                     newServiceHours

//             }
//         },
//     },
// });