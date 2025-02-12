import { useRouter } from "next/navigation";

import { ProductsResponse } from "@/share/interfaces/productInterface";
import PlayArrowIcon from "@/icons/PlayArrowIcon";

interface PaginationProps {
  data: ProductsResponse;
  filters: Record<string, string>;
}

function Pagination({ data, filters }: PaginationProps) {
  const router = useRouter();
  const page = Number(filters.page) || 0;

  const filtros = (pageValue: number) => {
    const updatedFilters = {
      ...filters,
      page: String(pageValue),
    };

    const queryString = new URLSearchParams(updatedFilters).toString();
    return `/products?${queryString}`;
  };

  const backPage = () => {
    if (page <= 0) return;
    router.push(filtros(page - 1));
  };

  const nextPage = () => {
    if (page >= data.page.totalPages - 1) return;
    router.push(filtros(page + 1));
  };

  return (
    <section className="flex items-center justify-center pb-5 lg:ml-60">
      <div className="flex items-center gap-x-3">
        <button
          className="flex items-center justify-center p-1 text-center rounded-md bg-primaryColor"
          onClick={backPage}
        >
          <PlayArrowIcon className="text-white rotate-180 size-5" />
        </button>
        <span className="text-lg font-bold">{page + 1}</span>
        <button
          className="flex items-center justify-center p-1 text-center rounded-md bg-primaryColor"
          onClick={nextPage}
        >
          <PlayArrowIcon className="text-white size-5" />
        </button>
      </div>
    </section>
  );
}

export default Pagination;
