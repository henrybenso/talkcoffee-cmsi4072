import Layout from "../../layout";
import Link from "next/link";

export default function ErrorPage({ errorMessage }: { errorMessage: string }) {
    return (
      <Layout>
        <div className="grid place-content-center">
          <section>
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              Oops! Something went wrong.
            </h1>
            <p>{errorMessage || "It seems there was an error processing your request."}</p>
            <Link href="/">
              <a className="text-blue-500 hover:underline">Go back to the home page</a>
            </Link>
          </section>
        </div>
      </Layout>
    );
  }

  