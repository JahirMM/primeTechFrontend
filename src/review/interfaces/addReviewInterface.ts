import { ReviewInterface } from "./reviewInterface";

export type AddReviewInterface = Pick<
  ReviewInterface,
  "reviewId" | "rating" | "comment" | "createdAt"
>;
