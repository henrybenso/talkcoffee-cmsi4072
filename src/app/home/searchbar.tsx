"use client";

import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/search?term=${searchTerm}`);
      const result = await response.json();

      console.log('Search result:', result);
    } catch (error) {
      console.error('Error searching:', error);
    }

    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Type your search here"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
