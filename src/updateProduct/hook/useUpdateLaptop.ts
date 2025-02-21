import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { UpdateLaptopInterface } from "@/updateProduct/interfaces/updateLaptopInterface";
import { ErrorResponseInterface } from "@/auth/interfaces/errorResponseInterface";

import { updateLaptop } from "@/updateProduct/services/updateLaptopService";

export function useUpdateLaptop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      laptopId,
      laptopData,
    }: {
      laptopId: string;
      laptopData: UpdateLaptopInterface;
    }) => updateLaptop(laptopId, laptopData),
    onSuccess: () => {
      toast.success("Información actualizada", {
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
