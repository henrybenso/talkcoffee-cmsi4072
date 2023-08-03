import Head from "next/head";
import Layout from "../layout";
import Headerinfo from "./headerinfo";
import ImageScroller from "./imageScroller";

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
          <Headerinfo />
          <article>
            <h2></h2>
          </article>
          <div className="">
            <ImageScroller />
          </div>
        </div>
      </>
    </Layout>
  );
}
