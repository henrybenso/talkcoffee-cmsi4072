import { NextResponse } from "next/server";
import { prisma } from "../../../../db";
import { ServiceHours, ServiceTypes } from "@prisma/client";

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

type serviceTypesa = {
  sitIn: string[];
  takeOut: boolean;
  delivery: boolean;
};

type ServiceTypesUncheckedCreateWithoutStoreInput = {
  id?: number;
  sitIn: string[];
  takeOut: boolean;
  delivery: boolean;
};
export async function POST(request: Request) {
  const res = await request.json();
  console.log("res: ", res);

  const {
    name,
    averageRating,
    instagramHandle,
    serviceTypes,
    serviceHours
  }: {
    name: string;
    averageRating: number;
    instagramHandle: string;
    serviceTypes: ServiceTypes;
    serviceHours: ServiceHours;
  } = res;

  const result = await prisma.store.create({
    data: {
      name,
      averageRating,
      instagramHandle,
      serviceTypes: {
        create: [
          {
            sitIn: serviceTypes.sitIn,
            takeOut: serviceTypes.takeOut,
            delivery: serviceTypes.delivery,
          },
        ],
      },
      serviceHours:{
        create: [
          {
              mondayOpen :adf
  mondayClose    DateTime
  tuesdayOpen    DateTime
  tuesdayClose   DateTime
  wednesdayOpen  DateTime
  wednesdayClose DateTime
  thursdayOpen   DateTime
  thursdayClose  DateTime
  fridayOpen     DateTime
  fridayClose    DateTime
  saturdayOpen   DateTime
  saturdayClose  DateTime
  sundayOpen     DateTime
  sundayClose    DateTime
          }
        ]
      }
    },
  });

  return NextResponse.json({
    name,
    averageRating,
    instagramHandle,
    serviceTypes,
  });
}
