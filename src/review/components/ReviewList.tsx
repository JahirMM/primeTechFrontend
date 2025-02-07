"use client";

import { getProductIdFromUrl } from "@/share/utils/getProductIdFromUrl";

import ReviewSummary from "@/review/components/ReviewSummary";
import ReviewItem from "@/review/components/ReviewItem";

import { useGetReviews } from "@/review/hook/useGetReviews";

function ReviewList() {
  const productId = getProductIdFromUrl();

  if (!productId) {
    return (
      <div className="text-center text-gray-500">
        No se encontró un productId
      </div>
    );
  }

  const { data, isLoading, isError } = useGetReviews(productId);

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando reviews...</div>;
  }

  if (isError || !data?.reviews?.length) {
    return (
      <div className="px-5 mb-5">
        <p className="text-sm font-semibold text-gray-700">
          Aún no hay opiniones
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 mt-10 mb-4">
      <h2 className="mb-4 text-lg font-semibold">Opiniones</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ReviewSummary productId={productId} reviews={data.reviews} />
        <section className="space-y-6 sm:col-start-2 sm:col-end-5">
          {data.reviews.map((review) => (
            <ReviewItem key={review.reviewId} review={review} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default ReviewList;
