import ArrowIcon from "@/icons/ArrowIcon";
import React from "react";

function createItems() {
  const items = [];
  for (let index = 0; index < 50; index++) {
    items.push(
      <React.Fragment key={index}>
        <span className="text-lg font-bold text-black">TODO - AQUÍ</span>
        <span className="bg-primaryColor p-2 rounded-full">
          <ArrowIcon className="size-3 -rotate-12 text-white" />
        </span>
      </React.Fragment>
    );
  }
  return items;
}

function Marquee() {
  const items = createItems();

  return (
    <div className="overflow-hidden">
      <div className="flex gap-2 whitespace-nowrap marquee">
        {items}
      </div>
    </div>
  );
}

export default Marquee;
