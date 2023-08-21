import { NextResponse } from "next/server";
import { prisma } from "../../../../db";

export async function GET() {
  const result = await prisma.store.findMany();
  return NextResponse.json({ result });
}

type sitInType = {
  sitIn: string[];
};

type serviceTypesType = {
  sitIn: sitInType;
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

  // const {
  //   name,
  //   averageRating,
  //   instagramHandle,
  //   serviceTypesa,
  //   serviceHours,
  // }: {
  //   name: string;
  //   averageRating: number;
  //   instagramHandle: string;
  //   serviceTypes: serviceTypesType;
  //   serviceHours: serviceHoursType;
  // } = res;

  const result = await prisma.store.create({
    data: {
      // name,
      // averageRating,
      // instagramHandle,
      // serviceTypes: {
      //   create: {
      //     sitIn: {
      //       [serviceTypesa.sitIn]
      //     }
      //   }
      // },
      ...res.body,
    },
  });

  return NextResponse.json({
    ...res.body,
  });
}
