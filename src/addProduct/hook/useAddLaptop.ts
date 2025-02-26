import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { AddLaptopInterface } from "@/addProduct/interfaces/addLaptopInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { addLaptop } from "@/addProduct/service/addLaptopService";

export function useAddLaptop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      laptopData,
    }: {
      productId: string;
      laptopData: AddLaptopInterface;
    }) => addLaptop(productId, laptopData),
    onSuccess: () => {
      toast.success("Información agregada", {
        duration: 2000,
        style: { backgroundColor: "#1F5A54", color: "white" },
      });
      queryClient.invalidateQueries({ queryKey: ["laptopInformation"] });
    },
    onError: (error: AxiosError<ErrorResponseInterface>) => {
      toast.error(error.message, {
        duration: 5000,
        style: { backgroundColor: "#FF5353", color: "white" },
      });
    },
  });
}
