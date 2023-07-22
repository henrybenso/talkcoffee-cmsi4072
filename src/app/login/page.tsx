import Layout from "../layout";
import Link from "next/link";

export default function Login() {
  return (
    <Layout>
      <div className="grid place-content-center">
        <section>
          <h1 className="hover:bg-sky-800">welcome to login</h1>
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
          </h2>
        </section>
        <br />
        <section>
          <h3>
            <Link href="/">back</Link>
            <button onClick={}>t Have an Account?</button>
          </h3>
        </section>
      </div>
    </Layout>
  );
}
