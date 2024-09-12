"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchInput({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const path = usePathname();
  const [query, setQuery] = useState("");
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (path.includes("/search/")) {
      router.push(query);
    } else {
      router.push(`./search/${query}`);
    }
  };
  return (
    <form onSubmit={(e) => handleSearch(e)} className="w-full h-full relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        data-icon="SvgSearch"
        aria-hidden="true"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
      >
        <path d="M10.1 3a7.1 7.1 0 11-5.02 2.08A7.074 7.074 0 0110.1 3zM21 21l-2.9-2.9-2.9-2.9"></path>
      </svg>
      <input
        className="w-full h-full rounded-full bg-stone-500/20 p-1 pl-10 px-2 text-sm placeholder-gray-300"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text"
      />
    </form>
  );
}
