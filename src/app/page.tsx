import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Layout from "../app/layout";

export default function Home() {
  return (
    <Layout>
      <div>
        {/* <head>
          <title>Welcome to TalkCoffee!</title>
        </head> */}
        <Link href="/login">Login</Link>
        <br />
        <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
          Save changes
        </button>
      </div>
    </Layout>
  );
}
