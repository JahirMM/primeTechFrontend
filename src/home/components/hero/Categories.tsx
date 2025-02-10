"use client";

import Link from "next/link";
import { useCategories } from "@/share/hook/useGetCategories";
import { CategoryItemsInterface } from "@/share/interfaces/categoryItemsInterface";
import CategoriesItemsSkeleton from "@/share/skeletons/CategoriesItemsSkeleton";

function Categories() {
  const { data, isLoading, isError } = useCategories();

  if (isError) {
    return <div className="text-xs">Error al obtener las categorías</div>;
  }

  if (isLoading) {
    return <CategoriesItemsSkeleton />;
  }

  const categoryMap: Record<string, { displayName: string; href: string }> = {
    cellular: { displayName: "Celulares", href: "/products" },
    tablet: { displayName: "Tablets", href: "/products" },
    laptop: { displayName: "Laptops", href: "/products" },
    other: { displayName: "Otros", href: "/products" },
  };

  const categoryItems: CategoryItemsInterface[] =
    data
      ?.filter((category) => categoryMap[category.categoryName])
      .map((category) => ({
        ...category,
        categoryName: categoryMap[category.categoryName].displayName,
        href: categoryMap[category.categoryName].href + "?categoryId=" + category.categoryId,
      })) || [];

  return (
    <div className="flex justify-center gap-3 pt-5 mb-6 md:m-0 md:p-0 md:flex-col md:relative">
      <span className="hidden md:inline md:text-sm">Categorías</span>
      {categoryItems.map(({ categoryName, href }) => (
        <Link
          key={categoryName}
          href={href ?? "/"}
          className="px-4 py-2 text-xs text-center rounded-lg bg-primaryColor text-md text-white/90"
        >
          {categoryName}
        </Link>
      ))}
    </div>
  );
}

export default Categories;
