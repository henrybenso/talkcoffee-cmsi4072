import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

export const DineTypes: {
  CAFE: "CAFE";
  BAR: "BAR";
} = {
  CAFE: "CAFE",
  BAR: "BAR",
};

export type DineTypes = (typeof DineTypes)[keyof typeof DineTypes];

type categoryType = {
  type: DineTypes;
};

type serviceTypesType = {
  sitIn: categoryType;
  takeOut: boolean;
  delivery: boolean;
};

type serviceHoursType = {
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
  photos: string[];
  serviceTypes: serviceTypesType;
  serviceHours: serviceHoursType;
};

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const {
    name,
    averageRating,
    ratingCount,
    instagramHandle,
    avatar,
    photos,
    serviceTypes,
    serviceHours,
  }: StoreType = res;

  const result = await prisma.store.create({
    data: {
      name,
      averageRating,
      ratingCount,
      instagramHandle,
      avatar,
      photos,
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
