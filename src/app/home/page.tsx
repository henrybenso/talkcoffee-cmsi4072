import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Layout from "../../app/layout";
import Searchbar from "./searchbar";

export default function Home() {
  return (
    <Layout>
      <>
        <section className="absolute top-0 right-0">
          <Link href="/login">
            <div className="p-1 px-4 flex shrink-1 max-w-xs rounded-xl shadow-lg bg-slate-100 hover:bg-slate-300 active:bg-slate-400">
              <div className="text-base font-medium text-black">Login</div>
            </div>
          </Link>
        </section>
        <div className="">
          <Link href="/stores">stores</Link>
        </div>
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
