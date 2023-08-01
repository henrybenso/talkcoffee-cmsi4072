import Link from "next/link";

export default function Headerinfo() {
  return (
    <>
      <section>
        <div className="p-1 px-4  max-w-md rounded-xl shadow-lg bg-slate-100 hover:bg-slate-300 active:bg-slate-400">
          <Link href="/" className="text-base font-medium text-black">
            back
          </Link>
        </div>
      </section>
      <section>
        <h1 className="uppercase">Banana Coffee Store</h1>
        <p>This is Banana Coffee Store. Best Coffee Shop in the world.</p>
      </section>
      <section>
        <h2>
          <ul>
            <li>Phone Number: 999-999-9999</li>
            <li>instagram: banana</li>
            <li>service types: banana banana bananna</li>
            <li>service hours: 5:00 - 5:00</li>
          </ul>
        </h2>
      </section>
    </>
  );
}
