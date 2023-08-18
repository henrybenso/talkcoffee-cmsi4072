import Head from "next/head";
import Layout from "../layout";
import Headerinfo from "./headerinfo";
import ImageScroller from "./imageScroller";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

enum StoreType {
  CAFE_SIT_IN = "CAFE_SIT_IN",
  CAFE_TAKE_OUT = "CAFE_TAKE_OUT",
  BAR_SIT_IN = "BAR_SIT_IN",
  NONE = "NONE",
}
export default function Page({
  store,
}: {
  store: {
    id: string;
    name: string;
    averageRating: number;
    phoneNumber: string | null;
    photos: string[];
    instagram: string | null;
    serviceTypes: { sitIn: StoreType[]; takeOut: boolean; delivery: boolean };
    serviceHours: {
      mondayOpen: string;
      mondayClose: string;
      tuesdayOpen: string;
      tuesdayClose: string;
      wednesdayOpen: string;
      wednesdayClose: string;
      thursdayOpen: string;
      thursdayClose: string;
      fridayOpen: string;
      fridayClose: string;
      saturdayOpen: string;
      saturdayClose: string;
      sundayOpen: string;
      sundayClose: string;
    };
  };
}) {
  return (
    <Layout>
      <>
        <div>
          <Link
            href="/stores/create"
            className={buttonVariants({ variant: "outline" })}
          >
            Add a store
          </Link>
        </div>
        <div>Google Rating:</div>
        <div>Talk Coffee Rating:</div>
      </>
    </Layout>
  );
}
