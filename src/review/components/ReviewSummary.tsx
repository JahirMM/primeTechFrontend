import { useGetAverageRating } from "@/share/hook/useGetAverageRating";
import StarIcon from "@/icons/StarIcon";

interface ReviewSummaryProps {
  productId: string;
  reviews: { reviewId: string }[];
}

function ReviewSummary({ productId, reviews }: ReviewSummaryProps) {
  const { data: averageRating } = useGetAverageRating(productId);
  const totalReviews = reviews.length;

  return (
    <section className="flex flex-col sm:justify-center sm:items-center">
      <div className="flex gap-3">
        <span className="text-3xl font-bold">
          {averageRating?.averageRating || "0.0"}
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {Array.from({
              length: Math.round(averageRating?.averageRating || 0),
            }).map((_, index) => (
              <StarIcon key={index} className="text-yellow-500 size-3" />
            ))}
          </div>
          <span className="text-xs">{totalReviews} opiniones</span>
        </div>
      </div>
    </section>
  );
}

export default ReviewSummary;
