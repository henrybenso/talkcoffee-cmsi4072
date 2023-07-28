import Layout from "../layout";
import Link from "next/link";

export default function Page() {
  return (
    <Layout>
      <>
        <section>
          <div className="p-1 px-4  max-w-md rounded-xl shadow-lg bg-slate-100 hover:bg-slate-300 active:bg-slate-400">
            <Link href="/" className="text-base font-medium text-black">
              back
            </Link>
          </div>
        </section>
        <div className="grid place-content-center">
          <section>
            <h1 className="p-5 shrink-0 flex place-content-center text-5xl font-bold text-black">
              welcome to login
            </h1>
          </section>
          <br />
          <section>
            <h2>
              <form>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    className="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                  />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                </label>
              </form>
              <form>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">
                    Username
                  </span>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                  />
                </label>
              </form>
              <br />
              <form>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                  />
                </label>
              </form>
            </h2>
          </section>
        </div>
      </>
    </Layout>
  );
}
