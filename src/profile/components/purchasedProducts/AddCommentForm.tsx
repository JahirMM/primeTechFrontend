import { useAddReview } from "@/review/hook/useAddReview";
import StarIcon from "@/icons/StarIcon";
import { useState } from "react";

interface AddCommentFormProps {
  productId: string;
}

export default function AddCommentForm({ productId }: AddCommentFormProps) {
  const mutationAddReview = useAddReview();

  const [rating, setRating] = useState<string>("0");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setRating("");
      return;
    }

    let numValue = Number(value);
    if (numValue < 0) numValue = 0;
    if (numValue > 5) numValue = 5;
    setRating(numValue.toString());
  };

  const handleBlur = () => {
    if (rating === "") setRating("0");
  };

  const addReview = () => {
    mutationAddReview.mutate({
      productId,
      data: { rating: Number(rating), comment: comment },
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium">Calificación</label>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => setRating(starValue.toString())}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(null)}
                  className={`p-1 transition-colors ${
                    (hoverRating ?? Number(rating)) >= starValue
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  <StarIcon
                    className="size-5"
                    fill={
                      (hoverRating ?? Number(rating)) >= starValue
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              );
            })}
          </div>

          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={handleRatingChange}
            onBlur={handleBlur}
            className="w-16 p-1 text-center border rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Comentario</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={800}
          placeholder="Escribe tu comentario aquí..."
          className="w-full p-2 mt-2 border rounded-lg outline-none resize-none h-[356px] focus:ring-2 focus:ring-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">{comment.length}/800</p>
      </div>

      <button
        type="submit"
        className="w-full py-2 text-sm transition duration-300 border border-black rounded-lg hover:text-white hover:bg-primaryColor hover:border-primaryColor"
        onClick={() => addReview()}
        aria-label="Enviar comentario"
      >
        Enviar comentario
        <span className="sr-only">Enviar comentario</span>
      </button>
    </form>
  );
}
