import { SuccessResponseInterface } from "@/share/interfaces/successResponseInterface";

import { getInitialApi } from "@/share/hook/useInitialApi";

const initialApi = getInitialApi();

export const uploadProductImage = async (
  productId: string,
  data: { file: File; isMain: boolean }
): Promise<SuccessResponseInterface> => {
  const formData = new FormData();
  formData.append("image", data.file);
  formData.append("isMain", data.isMain.toString());

  const response = await initialApi.post(
    `/product-image/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
