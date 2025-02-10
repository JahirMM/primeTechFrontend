'use client'

import ArrowIcon from "@/icons/ArrowIcon";
import { useRouter } from "next/navigation";
import React from "react";

function createItems() {
  const items = [];
  for (let index = 0; index < 50; index++) {
    items.push(
      <React.Fragment key={index}>
        <span className="text-lg font-bold text-black">TODO - AQUÍ</span>
        <span className="p-2 rounded-full bg-primaryColor">
          <ArrowIcon className="text-white size-3 -rotate-12" />
        </span>
      </React.Fragment>
    );
  }
  return items;
}

function Marquee() {
  const router = useRouter()
  const items = createItems();

  return (
    <div className="overflow-hidden">
      <div className="flex gap-2 cursor-pointer whitespace-nowrap marquee" onClick={() => router.push("/products")}>
        {items}
      </div>
    </div>
  );
}

export default Marquee;
