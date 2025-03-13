"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import SearchIcon from "@/icons/SearchIcon";

function HomeFilter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const query = inputRef.current?.value.trim();
    if (query) {
      router.push(`/products?name=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-secondaryColor rounded-xl">
      <button
        type="button"
        onClick={handleSearch}
        aria-label="Buscar productos"
      >
        <SearchIcon className="cursor-pointer size-4" />
        <span className="sr-only">Buscar producto</span>
      </button>
      <input
        ref={inputRef}
        type="text"
        className="flex-1 px-1 outline-none bg-secondaryColor placeholder:text-sm"
        onKeyDown={handleKeyDown}
        placeholder="Buscar productos..."
      />
    </div>
  );
}

export default HomeFilter;
