import { formatDate } from "@/share/utils/formatDate";
import StarIcon from "@/icons/StarIcon";

interface Review {
  reviewId: string;
  name: string;
  createdAt: string;
  rating: number;
  comment: string;
}

interface ReviewItemProps {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps) {
  return (
    <article className="p-4 border rounded-lg shadow-md">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="font-semibold">{review.name}</h3>
        <span className="text-xs text-gray-500">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, index) => (
            <StarIcon key={index} className="text-yellow-500 size-3" />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {review.rating}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
    </article>
  );
}

export default ReviewItem;
