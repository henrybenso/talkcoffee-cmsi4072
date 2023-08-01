import Head from "next/head";
import Layout from "../../app/layout";
import Headerinfo from "./headerinfo";
import ImageScroller from "./imageScroller";

export default function Page() {
  return (
    <Layout>
      <>
        <div>
          <Headerinfo />
          <article>
            <h2></h2>
          </article>
          <div className="overflow-x-scroll">
            <ImageScroller />
          </div>
        </div>
      </>
    </Layout>
  );
}
