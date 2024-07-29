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
    <form onSubmit={(e) => handleSearch(e)}>
      <input
        className="mb-2 w-full rounded-full bg-stone-500/20 p-1 px-2 text-sm placeholder-gray-300"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text"
      />
    </form>
  );
}
