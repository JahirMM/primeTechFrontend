import { useParams } from "next/navigation";

export function getProductIdFromUrl() {
  const params = useParams();
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;

  return productId;
}
