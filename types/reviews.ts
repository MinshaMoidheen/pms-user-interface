export type ReviewTargetType = "PROPERTY" | "JOB" | "AGENT";

export interface IReview {
  targetType: ReviewTargetType; // What is being reviewed
  targetId: string; // ID of the Property, JobPost, or User (BROKER)
  owner: string; // User who owns the product (postedBy / agent) — for profile aggregation
  reviewer: string; // User who wrote the review
  rating: number; // 1 to 5
  comment?: string;
  isDeleted: {
    status: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface getReviewsResponse {
  success: boolean;
  message: string;
  data: {
    target: string;
    stats: {
      averageRating: number;
      reviewCount: number;
      breakdown: { 1: number; 2: number; 3: number; 4: number; 5: number };
    };
    reviews: IReview[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}


export interface addReviewResponse {
  success: boolean;
  message: string;
  data: {
    review: IReview,
    productStats: number,
  };
}
