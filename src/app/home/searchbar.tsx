"use client";
export default function Searchbar() {
  return (
    <label className="">
      <span className="">
        <form action="">
          <input
            type="text"
            id="search"
            name="search"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Search..."
          />
        </form>
      </span>
    </label>
  );
}
