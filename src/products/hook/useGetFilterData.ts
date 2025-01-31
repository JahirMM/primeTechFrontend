import { useQuery } from "@tanstack/react-query";

import { FilterDataResponseInterface } from "@/products/interfaces/filterDataResponseInterface";

import { getFilterData } from "@/products/service/getFilterDataService";

export const useGetFilterData = () => {
  return useQuery<FilterDataResponseInterface, Error>({
    queryKey: ["filterData"],
    queryFn: getFilterData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
