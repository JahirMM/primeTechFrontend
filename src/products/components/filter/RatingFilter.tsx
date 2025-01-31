import React, { useState, SetStateAction } from "react";
import StarIcon from "@/icons/StarIcon";

interface RatingFilterProps {
  minRating: number;
  setMinRating: React.Dispatch<SetStateAction<number>>;
}

function RatingFilter({ minRating, setMinRating }: RatingFilterProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    setMinRating(rating);
  };

  const handleHover = (rating: number | null) => {
    setHoverRating(rating);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMinRating(isNaN(value) ? 0 : value);
  };

  const handleBlur = () => {
    let value = parseFloat(minRating.toString());
    if (isNaN(value) || value < 0) value = 0;
    if (value > 5) value = 5;
    setMinRating(value);
  };

  return (
    <div className="py-5 mt-5 border-y border-y-gray-400">
      <span className="block mb-2 text-xs">Calificación</span>
      <div className="flex items-center gap-x-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleClick(rating)}
              onMouseEnter={() => handleHover(rating)}
              onMouseLeave={() => handleHover(null)}
              className="p-1"
            >
              <StarIcon
                className={`size-4 ${
                  (hoverRating ?? minRating) >= rating
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <input
          type="number"
          className="p-1 text-sm text-center border border-gray-300 rounded w-14"
          value={minRating}
          min={0}
          max={5}
          step={0.5}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default RatingFilter;
