import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { prisma } from "../../../../db"
import { schemaBackend } from "@/app/validation"

import moment from "../../../utils/moment-timezone"

cloudinary.config(process.env.CLOUDINARY_URL || '');

export const config = {
  api: {
    bodyParser: false,
  },
};

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

export async function POST(request: NextRequest) {

  const formData = await request.formData()
  const storeFlat = formData.get("store")
  const storeObj = JSON.parse(String(storeFlat))

  const file = formData.get("avatar")

  const fileName = (file as File).name;
  const fileBlob = file as Blob
  const filePath = `public/images/uploads/${fileName}`
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
    return { message: 'Failed to create Store' }
  }

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await fileBlob.arrayBuffer());
  const storeData = parse.data

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const averageRating = parseInt(storeData.rating)
  const ratingCount = 1
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

  fs.writeFileSync(filePath, buffer)
  const imageData = await cloudinary.uploader.upload(filePath)
  fs.unlinkSync(filePath)

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
    serviceTypes: {
      sitIn: sitInArr,
      takeOut: storeData.serviceTypes.takeOut.value,
      delivery: storeData.serviceTypes.delivery.value,
      curbsidePickup: storeData.serviceTypes.curbsidePickup.value
    },
    serviceHours: serviceHoursArr,
  }

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
