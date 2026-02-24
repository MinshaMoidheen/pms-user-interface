import { apiSlice } from "./apiSlice";
import { REVIEWS_URL } from "../constants";
import { addReviewResponse, getReviewsResponse, ReviewTargetType } from "@/types/reviews";

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
   getReviews: builder.query<getReviewsResponse, {targetType: ReviewTargetType, targetId: string, page: number, limit: number}>({
    query: ({targetType, targetId, page, limit}) => ({
        url: `${REVIEWS_URL}/${targetType}/${targetId}`,
        method: "GET",
        params: {page, limit}
    }),
    providesTags: (result, error, id) => [{ type: "Reviews", id: "LIST" }],
   }),

   addReview: builder.mutation<addReviewResponse, {targetType: ReviewTargetType, targetId: string, rating: number, comment?: string}>({
    query: ({targetType, targetId, rating, comment}) => ({
        url: `${REVIEWS_URL}/${targetType}/${targetId}`,
        method: "POST",
        body: {rating, comment}
    }),
    invalidatesTags: (result, error, id) => [{ type: "Reviews", id: "LIST" }],
   }),

   updateReview: builder.mutation<addReviewResponse, {reviewId: string, rating: number, comment?: string}>({
    query: ({reviewId, rating, comment}) => ({
        url: `${REVIEWS_URL}/${reviewId}`,
        method: "PUT",
        body: {rating, comment}
    }),
    invalidatesTags: (result, error, id) => [{ type: "Reviews", id: "LIST" }],
   }),

  }),
});

export const {
    useGetReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
} = reviewsApiSlice;
