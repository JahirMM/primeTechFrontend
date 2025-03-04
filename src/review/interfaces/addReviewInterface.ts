import { ReviewInterface } from "./reviewInterface";

export interface AddReviewInterface
  extends Pick<
    ReviewInterface,
    "reviewId" | "rating" | "comment" | "createdAt"
  > {}
