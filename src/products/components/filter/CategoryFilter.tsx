import { CategoryItemsInterface } from "@/share/interfaces/categoryItemsInterface";
import React, { SetStateAction } from "react";

interface CategoryFilterProps {
  categoryItems: CategoryItemsInterface[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
}

function CategoryFilter({
  categoryItems,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <div className="pb-5 mt-3 border-b border-b-gray-400">
      <span className="block mb-3 text-xs">Categorías</span>
      <ul className="flex flex-wrap gap-2">
        {categoryItems.map((category) => (
          <li key={category.categoryId}>
            <button
              type="button"
              aria-label={category.categoryName}
              className={`border border-gray-400 text-[10px] px-2 py-1 rounded-lg ${
                selectedCategory === category.categoryId
                  ? "bg-primaryColor text-white border-primaryColor"
                  : ""
              } transition-colors duration-300 hover:bg-primaryColor hover:text-white hover:border-primaryColor`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.categoryId
                    ? ""
                    : category.categoryId
                )
              }
            >
              {category.categoryName}
              <span className="sr-only">{category.categoryName}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
