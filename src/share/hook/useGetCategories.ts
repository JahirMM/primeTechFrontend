import { useQuery } from "@tanstack/react-query";

import { CategoryInterface } from "@/share/interfaces/categoryInterface";

import { getCategories } from "@/share/services/categoryService";

export const useCategories = () => {
  return useQuery<CategoryInterface[], Error>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
