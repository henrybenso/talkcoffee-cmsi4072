import { NextResponse } from "next/server";
import { prisma } from "../../../../db";
import { StoreTypes } from "@prisma/client";

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

type StoreTypesType = StoreTypes;

type serviceTypesType = {
  sitIn: StoreTypesType[];
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

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const {
    name,
    averageRating,
    ratingCount,
    instagramHandle,
    serviceTypes,
    serviceHours,
  }: {
    name: string;
    averageRating: number;
    ratingCount: number;
    instagramHandle: string;
    serviceTypes: serviceTypesType;
    serviceHours: serviceHoursType;
  } = res;

  const result = await prisma.store.create({
    data: {
      name,
      averageRating,
      ratingCount,
      instagramHandle,
      serviceTypes: {
        create: {
          sitIn: serviceTypes.sitIn,
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

  return NextResponse.json({});
}
