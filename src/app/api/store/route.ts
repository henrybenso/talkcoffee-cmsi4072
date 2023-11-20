import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

import { getImage } from "@/utils/formidable";
import { uploadImage } from "@/utils/cloudinary";

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

type CategoryType = {
  value: DineTypes
  label: string
};

type HoursType = {
  open: string
  close: string
}

type ServiceTypesType = {
  sitIn: CategoryType[];
  takeOut: boolean;
  delivery: boolean;
};

type ServiceHoursType = {
  sunday: HoursType
  monday: HoursType
  tuesday: HoursType
  wednesday: HoursType
  thursday: HoursType
  friday: HoursType
  saturday: HoursType
}

type StoreType = {
  name: string;
  rating: string;
  phoneNumber: string;
  instagramHandle: string;
  avatar: string;
  // images: [ImagesType]
  serviceTypes: ServiceTypesType;
  serviceHours: ServiceHoursType;
  timezone: string;
};

// type ImagesType = {
//   publicId: string;
//   format: string;
//   version: string;
// };

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

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

export async function POST(request: Request) {
  const res = await request.json();
  // console.log("res: ", res);

  const {
    name,
    rating,
    phoneNumber,
    instagramHandle,
    avatar,
    serviceTypes,
    serviceHours,
    timezone
  }: StoreType = res;

  // console.log(serviceTypes.sitIn)

  // const imageUploaded = await getImage(request);
  // let imageDatas = [];
  // imageUploaded.map(async (image) => {
  //   const imageData = await uploadImage(image.path);
  //   imageDatas.append({
  //     publicId: imageData.public_id,
  //     format: imageData.format,
  //     version: imageData.version.tostring(),
  //   });
  // });

  const sitInValues = []

  const sitInArr = serviceTypes.sitIn


  sitInArr.map((obj) => {
    sitInValues.push(DineTypes[obj['value']])
  })

  // console.log(sitInValues)

  const keys = Object.keys(serviceHours)

  const newServiceHours = []
  // console.log(newServiceHours)


  let date = new Date()
  let dateToText = date.toISOString()
  let currentDate: string = dateToText.slice(0, 10)

  keys.forEach(key => {
    let currentDay = serviceHours[key as keyof ServiceHoursType]
    if (currentDay.open !== null && currentDay.open !== null) {
      currentDay.day = (Days as Days)[key]

      let formattedCloseDate = currentDate.concat(" ", currentDay.close)
      let convertedCloseDate = moment.tz(formattedCloseDate, timezone)
      currentDay.close = convertedCloseDate.utc().format()

      let formattedOpenDate = currentDate.concat(" ", currentDay.open)
      let convertedOpenDate = moment.tz(formattedOpenDate, timezone)
      currentDay.open = convertedOpenDate.utc().format()

      // console.log(convertedCloseDate)
      newServiceHours.push(currentDay)
    }
  })

  // console.log(newServiceHours)

  // newServiceHours.map((obj) => {
  //   let formattedCloseDate = currentDate.concat(" ", obj.close)
  //   let converetedCloseDate = moment.utc(formattedCloseDate).tz(timezone);

  //   let closeDateToUTC = converetedCloseDate.format()
  //   obj.close = closeDateToUTC

  //   let formattedOpenDate = currentDate.concat(" ", obj.open)
  //   let converetedOpenDate = moment.utc(formattedOpenDate).tz(timezone);

  //   let openDateToUTC = converetedOpenDate.format()
  //   obj.open = openDateToUTC
  // })

  const averageRating = parseInt(rating)
  const ratingCount = 1

  // console.log(newServiceHours)

  const result = await prisma.store.create({
    data: {
      name,
      averageRating,
      ratingCount,
      phoneNumber,
      instagramHandle,
      avatar,
      // images: {
      //   createMany: {
      //     data: imageDatas,
      //     skipDuplicates: true,
      //   },
      // },
      serviceTypes: {
        create: {
          sitIn: sitInValues,
          takeOut: serviceTypes.takeOut,
          delivery: serviceTypes.delivery,
        },
      },
      serviceHours: {
        createMany: {
          data:
            newServiceHours

        }
      },
    },
  });

  // console.log("result: ")
  // console.log(result)

  return NextResponse.json({
    result,
  });
}

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