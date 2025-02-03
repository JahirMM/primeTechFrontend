"use client";

import { useParams } from "next/navigation";

import { useGetProductDetails } from "@/productDetails/hook/useGetProductDetails";
import { useGetAverageRating } from "@/share/hook/useGetAverageRating";

import ProductDetailsImages from "@/productDetails/components/ProductDetailsImages";

import StarIcon from "@/icons/StarIcon";

function ProductDetails() {
  const params = useParams();
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;

  if (!productId) {
    return <div>No se encontro un productId</div>;
  }

  const {
    data: productDetailsData,
    isLoading: isProductLoading,
    isError: hasProductError,
  } = useGetProductDetails(productId);

  const {
    data: averageRatingData,
    isLoading: isAverageRatingLoading,
    isError: hasAverageRatingError,
  } = useGetAverageRating(productId);

  return (
    <section className="mt-[58px] min-h-[calc(100vh-58px)] md:grid md:grid-cols-4 md:justify-center">
      <ProductDetailsImages productId={productId} />

      {productDetailsData && isProductLoading ? (
        <div>Cargando</div>
      ) : hasProductError ? (
        <div>Error loading product details</div>
      ) : (
        <div className="md:col-start-3 md:col-end-5 md:grid md:grid-cols-1 md:content-center md:gap-y-10 md:max-w-[85%]">
          {/* NOMBRE DEL PRODUCTO */}
          <div className="px-5 mt-5 md:mt-0">
            <span className="block mb-4 text-xs text-gray-500">
              {productDetailsData?.product.deviceType}
            </span>
            {averageRatingData && isAverageRatingLoading ? (
              <div>Cargando rating</div>
            ) : hasAverageRatingError ? (
              <div>Error en el rating</div>
            ) : averageRatingData?.averageRating &&
              averageRatingData?.averageRating > 0 ? (
              <div className="flex mt-1 gap-x-3">
                <StarIcon className="text-yellow-500 size-3" />
                <span className="text-xs">4.2</span>
              </div>
            ) : null}
            <h1 className="mt-2 text-base font-bold">
              {productDetailsData?.product.name}
            </h1>
            <span className="inline-block mt-1 text-base font-bold">
              ${productDetailsData?.product.price}
            </span>
          </div>
          {/* VENDEDOR */}
          <div className="flex px-5 mt-5 gap-x-2 md:mt-0">
            <img
              src="/images/home/img-home.svg"
              alt=""
              className="border border-gray-500 rounded-full size-12"
            />
            <div className="flex flex-col gap-y-2">
              <span className="text-sm">Raul Hernandez</span>
              <span className="text-xs text-gray-500">
                49 productos vendidos
              </span>
            </div>
          </div>
          {/* BOTONES */}
          <div className="flex items-center justify-between gap-5 px-5 mt-5 sm:justify-start md:mt-0">
            <div className="px-3 py-2 bg-secondaryColor rounded-xl">
              <button className="px-1 mr-2">-</button>
              <span className="px-1">3</span>
              <button className="px-1 ml-2">+</button>
            </div>
            <button className="px-3 py-2 text-white bg-primaryColor rounded-xl">
              Agregar al carrito
            </button>
          </div>
          {/* DESCRIPCIÓN */}
          <div className="px-5 mt-5 text-sm text-pretty md:mt-0 md:row-start-2 md:row-end-3">
            {productDetailsData?.product.description}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;
