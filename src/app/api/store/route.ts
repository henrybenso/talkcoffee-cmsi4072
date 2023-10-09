import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

import { getImage } from "../../../utils/formidable";
import { uploadImage } from "../../../utils/cloudinary";

export const DineTypes: {
  CAFE: "CAFE";
  BAR: "BAR";
} = {
  CAFE: "CAFE",
  BAR: "BAR",
};

export type DineTypes = (typeof DineTypes)[keyof typeof DineTypes];

type CategoryType = {
  type: DineTypes;
};

type Image = {
  publicId: string;
  format: string;
  version: string;
};

type ServiceTypesType = {
  sitIn: CategoryType;
  takeOut: boolean;
  delivery: boolean;
};

type ServiceHoursType = {
  mondayOpen: Date;
  mondayClose: Date;
  tuesdayOpen: Date;
  tuesdayClose: Date;
  wednesdayOpen: Date;
  wednesdayClose: Date;
  thursdayOpen: Date;
  thursdayClose: Date;
  fridayOpen: Date;
  fridayClose: Date;
  saturdayOpen: Date;
  saturdayClose: Date;
  sundayOpen: Date;
  sundayClose: Date;
};

type StoreType = {
  name: string;
  averageRating: number;
  ratingCount: number;
  instagramHandle: string;
  avatar: string;
  images: Image[];
  serviceTypes: ServiceTypesType;
  serviceHours: ServiceHoursType;
};

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const {
    name,
    averageRating,
    ratingCount,
    instagramHandle,
    avatar,
    serviceTypes,
    serviceHours,
  }: StoreType = res;

  const imageUploaded = await getImage(request);
  const imageData = await uploadImage(imageUploaded.path);

  const imagesData: Image[] = imageData.map((image) => ({
    publicId: image.publicId,
    format: image.format,
    version: image.version,
  }));

  const result = await prisma.store.create({
    data: {
      name,
      averageRating,
      ratingCount,
      instagramHandle,
      avatar,
      images: {
        createMany: {
          data: imagesData,
        },
      },
      serviceTypes: {
        create: {
          sitIn: {
            create: {
              type: serviceTypes.sitIn.type,
            },
          },
          takeOut: serviceTypes.takeOut,
          delivery: serviceTypes.delivery,
        },
      },
      serviceHours: {
        create: {
          mondayOpen: serviceHours.mondayOpen,
          mondayClose: serviceHours.mondayClose,
          tuesdayOpen: serviceHours.tuesdayOpen,
          tuesdayClose: serviceHours.tuesdayClose,
          wednesdayOpen: serviceHours.wednesdayOpen,
          wednesdayClose: serviceHours.wednesdayClose,
          thursdayOpen: serviceHours.thursdayOpen,
          thursdayClose: serviceHours.thursdayClose,
          fridayOpen: serviceHours.fridayOpen,
          fridayClose: serviceHours.fridayClose,
          saturdayOpen: serviceHours.saturdayOpen,
          saturdayClose: serviceHours.saturdayClose,
          sundayOpen: serviceHours.sundayOpen,
          sundayClose: serviceHours.sundayClose,
        },
      },
    },
  });

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