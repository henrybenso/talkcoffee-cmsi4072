import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Layout from "../../app/layout";
import Searchbar from "./searchbar";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <Layout>
      <>
        <section className="absolute top-0 right-0 shadow-lg">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </section>
        <section className="">
          <Link
            href="/stores"
            className={buttonVariants({ variant: "outline" })}
          >
            Stores
          </Link>
        </section>
        <h1 className="p-5 shrink-0 flex place-content-center">
          <div className="text-5xl font-bold text-yellow-900">TalkCoffee</div>
        </h1>
        <h2 className="p-4">
          <Searchbar />
        </h2>
        <div>
          <br />
          <button className="p-2 shrink-0 flex rounded-xl shadow-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
            <div className="text-base font-medium text-black">Save changes</div>
          </button>
        </div>
      </>
    </Layout>
  );
}
