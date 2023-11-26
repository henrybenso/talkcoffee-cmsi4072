import { NextResponse } from "next/server";
import { getImage } from "@/utils/formidable";
import { uploadImage } from "@/utils/cloudinary";
import { prisma } from "../../../../db"
import { schemaBackend } from "@/app/validation"

import moment from "../../../utils/moment-timezone"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

interface Days {
  sunday: "SUN",
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "TR",
  friday: "FRI",
  saturday: "SAT",
}

export const Days = {
  sunday: "SUN",
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "TR",
  friday: "FRI",
  saturday: "SAT",
}

export const DineTypes: {
  CAFE: "CAFE";
  BAR: "BAR";
} = {
  CAFE: "CAFE",
  BAR: "BAR",
};

export type DineTypes = (typeof DineTypes)[keyof typeof DineTypes];

// type SitInType = {
//   value: DineTypes
//   label: string
// };

// type OutDineType = {
//   value: boolean
//   label: string
// }

type HoursType = {
  open: string
  close: string
}

// type ServiceTypesType = {
//   sitIn: SitInType[];
//   takeOut: OutDineType;
//   delivery: OutDineType
//   curbsidePickup: OutDineType;
// };

type ServiceHoursType = {
  sunday: HoursType
  monday: HoursType
  tuesday: HoursType
  wednesday: HoursType
  thursday: HoursType
  friday: HoursType
  saturday: HoursType
}

// type FileType = {
//   name: string
//   lastModified: string
//   lastModifiedDate: Date
// }

// type StoreType = {
//   name: string;
//   rating: string;
//   phoneNumber: string;
//   instagramHandle: string;
//   avatar: FileType;
//   // images: [ImagesType]
//   serviceTypes: ServiceTypesType;
//   serviceHours: ServiceHoursType;
//   timezone: string;
// };

// type ImagesType = {
//   publicId: string;
//   format: string;
//   version: string;
// };

// export async function GET() {
//   const result = await prisma.store.findMany();
//   return NextResponse.json({ result });
// }

// export async function GET(request: Request) {
//   const query = req. 
//   const result = await prisma.store.findMany({
//     where: {
//       name: {
//         contains
//       }
//     }
//   });
//   return NextResponse.json({ result });
// }

interface StoreObject {
  [key: string]: any
}

export async function POST(request: Request) {

  const formData = await request.formData()
  const storeFlat = formData.get("store")
  const storeObj = JSON.parse(String(storeFlat))
  console.log(storeObj)

  const file = formData.get("avatar") as Blob | null


  const parse = schemaBackend.safeParse({
    name: storeObj["name"],
    rating: storeObj["rating"],
    phoneNumber: storeObj["phoneNumber"],
    instagramHandle: storeObj["instagramHandle"],
    avatar: storeObj["avatar"],
    serviceTypes: storeObj["serviceTypes"],
    serviceHours: storeObj["serviceHours"]
  });

  if (!parse.success) {
    console.log("ai0gnj0sdgiag0sasdfasdfasdfasdfasdfasdgasdgSFHGDDDDDDDDDDDDDDDDDDDDDDid")
    return { message: 'Failed to create Store' }
  }

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());


  console.log("successful pasradoasdfasdfadgi0hnasg0igs0ihgsd PARSE")
  const storeData = parse.data

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const averageRating = parseInt(storeData.rating)
  const ratingCount = 1
  const sitInValues: DineTypes[] = []
  const sitIn = storeData.serviceTypes.sitIn

  const keys = Object.keys(storeData.serviceHours)
  const sitInArr: DineTypes[] = [], serviceHoursArr: { day: Days, open: string, close: string }[] = []
  let date = new Date()
  let dateToText = date.toISOString()
  let currentDate: string = dateToText.slice(0, 10)

  sitIn.map((obj) => {
    sitInArr.push(obj.value)
  })

  keys.forEach(key => {
    let currentDay = storeData.serviceHours[key as keyof ServiceHoursType]
    if (currentDay.open !== "" && currentDay.open !== "") {
      currentDay.day = (Days as Days)[key]

      let formattedCloseDate = currentDate.concat(" ", currentDay.close)
      let convertedCloseDate = moment.tz(formattedCloseDate, timezone)
      currentDay.close = convertedCloseDate.utc().format()

      let formattedOpenDate = currentDate.concat(" ", currentDay.open)
      let convertedOpenDate = moment.tz(formattedOpenDate, timezone)
      currentDay.open = convertedOpenDate.utc().format()

      // console.log(convertedCloseDate)
      serviceHoursArr.push(currentDay)
    }
  })

  console.log("AYOadisjasdigj")
  //fails after here
  const imageUploaded = await getImage(formData)

  // console.log(imageUploaded.path)

  const imageData = await uploadImage(imageUploaded)

  console.log("A09EIHRA[09GHER90HJA9-ERHUA-0HREA-H00-H EYEYEYYE")

  const store = {
    name: storeData.name,
    averageRating: averageRating,
    ratingCount: ratingCount,
    phoneNumber: storeData.phoneNumber,
    instagramHandle: storeData.instagramHandle,
    avatar: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
    // avatar: "",
    serviceTypes: {
      sitIn: sitInArr,
      takeOut: storeData.serviceTypes.takeOut.value,
      delivery: storeData.serviceTypes.delivery.value,
      curbsidePickup: storeData.serviceTypes.curbsidePickup.value
    },
    serviceHours: serviceHoursArr,
  }

  console.log(store)

  const name = store.name, phoneNumber = store.phoneNumber, instagramHandle = store.instagramHandle, avatarPublicId = store.avatar.publicId, avatarFormat = store.avatar.format, avatarVersion = store.avatar.version, serviceTypesSitIn = store.serviceTypes.sitIn, serviceTypesTakeOut = store.serviceTypes.takeOut, serviceTypesDelivery = store.serviceTypes.delivery, serviceTypesCurbsidePickup = store.serviceTypes.curbsidePickup, serviceHours = store.serviceHours
  const result = await prisma.store.create({
    data: {
      name,
      averageRating,
      ratingCount,
      phoneNumber,
      instagramHandle,
      avatar: {
        create: {
          publicId: avatarPublicId,
          format: avatarFormat,
          version: avatarVersion
        }
      },
      serviceTypes: {
        create: {
          sitIn: serviceTypesSitIn,
          takeOut: serviceTypesTakeOut,
          delivery: serviceTypesDelivery,
          curbsidePickup: serviceTypesCurbsidePickup
        }
      },
      serviceHours: {
        createMany: {
          data:
            serviceHours

        }
      }


    }
  })

  return NextResponse.json({
    result,
  });

}
// const res = await request.json();
// const formData = await request.formData()
// // console.log("res: ", res);

// const {
//   name,
//   rating,
//   phoneNumber,
//   instagramHandle,
//   avatar,
//   serviceTypes,
//   serviceHours,
//   timezone
// }: StoreType = res;

// const averageRating = parseInt(rating)
// const ratingCount = 1
// const sitInValues: DineTypes[] = []
// const sitInArr = serviceTypes.sitIn
// sitInArr.map((obj) => {
//   sitInValues.push(DineTypes[obj['value']])
// })

// const keys = Object.keys(serviceHours)
// const newServiceHours: { day: Days, open: string, close: string }[] = []
// let date = new Date()
// let dateToText = date.toISOString()
// let currentDate: string = dateToText.slice(0, 10)

// keys.forEach(key => {
//   let currentDay = serviceHours[key as keyof ServiceHoursType]
//   if (currentDay.open !== "" && currentDay.open !== "") {
//     currentDay.day = (Days as Days)[key]

//     let formattedCloseDate = currentDate.concat(" ", currentDay.close)
//     let convertedCloseDate = moment.tz(formattedCloseDate, timezone)
//     currentDay.close = convertedCloseDate.utc().format()

//     let formattedOpenDate = currentDate.concat(" ", currentDay.open)
//     let convertedOpenDate = moment.tz(formattedOpenDate, timezone)
//     currentDay.open = convertedOpenDate.utc().format()

//     // console.log(convertedCloseDate)
//     newServiceHours.push(currentDay)
//   }
// })

// // let prismaAvatar = {

// // }

// // const imageUploaded = await getImage(request);
// // console.log(imageUploaded)
// // let imageDatas = [];
// // imageUploaded.map(async (image) => {
// //   const imageData = await uploadImage(image.path);
// //   imageDatas.append({
// //     publicId: imageData.public_id,
// //     format: imageData.format,
// //     version: imageData.version.tostring(),
// //   });
// // });

// const imageUploaded = await getImage(request)

// const imageData = await uploadImage(imageUploaded.path)



// const result = await prisma.store.create({
//   data: {
//     name,
//     averageRating,
//     ratingCount,
//     phoneNumber,
//     instagramHandle,
//     avatar: {
//       create: {
//         publicId: imageData.public_id,
//         format: imageData.format,
//         version: imageData.version.toString(),
//       }
//     },
//     // images: {
//     //   createMany: {
//     //     data: imageDatas,
//     //     skipDuplicates: true,
//     //   },
//     // },
//     serviceTypes: {
//       create: {
//         sitIn: sitInValues,
//         takeOut: serviceTypes.takeOut.value,
//         delivery: serviceTypes.delivery.value,
//         curbsidePickup: serviceTypes.curbsidePickup.value,
//       },
//     },
//     serviceHours: {
//       createMany: {
//         data:
//           newServiceHours

//       }
//     },
//   },
// });

// // console.log("result: ")
// // console.log(result)

// return NextResponse.json({
//   result,
// });

// export async function UPDATE(request: Request) {
//   const res = await request.json();

//   const { phoneNumber, instagramHandle, avatar, serviceTypes, serviceHours } =
//     res;

//   const result = prisma.user.update({
//     where: {
//       email: email,
//     },
//     data: {},
//   });

//   return NextResponse.json({ result });
// }