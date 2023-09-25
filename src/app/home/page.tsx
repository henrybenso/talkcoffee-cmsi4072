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
        <section className="">
          <div className="absolute top-0 right-0">
            <Link
              href="/signin"
              className={buttonVariants({ variant: "outline" })}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ variant: "outline" })}
            >
              Sign up
            </Link>
          </div>
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
      </>
    </Layout>
  );
}
