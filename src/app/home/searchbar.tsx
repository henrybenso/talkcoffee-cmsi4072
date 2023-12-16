"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Result from "./result";
import Suggestion from "./suggestion";
import { PrismaStoreType } from "../types";

export default function Search() {
  const [suggestionState, setSuggestionState] = useState([]);
  const [resultState, setResultState] = useState<PrismaStoreType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  // const [showButtons, setShowButtons] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      fetchFilteredSuggestStores(term);
      setShowSuggestions(true);
    } else {
      params.delete("query");
      setShowSuggestions(false);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function onSubmit() {
    setShowSuggestions(false);
    setShowButtons(true);

    fetchFilteredStores(searchTerm);
    // setShowButtons(true);
  }

  async function fetchFilteredSuggestStores(query: string) {
    const res = await fetch(`http://localhost:3000/api/search?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setSuggestionState(data);
    return data;
  }

  async function fetchFilteredStores(query: string) {
    const res = await fetch(`http://localhost:3000/api/search?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setResultState(data);
    return data;
  }

  const suggestionList = Object.keys(suggestionState).map((store) => (
    <li key={suggestionState[store].name} className="">
      <Suggestion store={suggestionState[store]} />
    </li>
  ));

  const storesList = Object.keys(resultState).map((store) => (
    <li key={resultState[store].name} className="">
      <Result store={resultState[store]} />
    </li>
  ));

  return (
    <div className="">
      {/* <form onSubmit={onSubmit}> */}
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          name="search"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Button type="button" onClick={onSubmit}>
          Search
        </Button>
      </div>
      {/* </form> */}
      <div className="pb-2"></div>
      <div className="">
        {showSuggestions && (
          <ol className=" overflow-y-auto h-80 max-h-full bg-white suggestionsList">
            {suggestionList}
          </ol>
        )}
      </div>
      <div className="pb-10"></div>
      <div>
        {showButtons && (
          <ol className="overflow-y-scroll max-h-fit bg-white storesList">
            {storesList}
          </ol>
        )}
      </div>
    </div>
  );
}
