import { apiSlice } from "./apiSlice";
import { SUBSCRIPTION_URL } from "../constants";
import { activateSubscriptionRequest, activateSubscriptionResponse, cancelSubscriptionRequest, cancelSubscriptionResponse, getSubscriptionPlansResponse, getUserSubscriptionsResponse, SubscriptionStatus } from "@/types/subscription";


const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
   getSubscriptionPlans: builder.query<getSubscriptionPlansResponse, void>({
    query: () => ({
        url: `${SUBSCRIPTION_URL}/plans`,
        method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: "Subscription", id: "LIST" }],
   }),

   getUserSubscriptions: builder.query<getUserSubscriptionsResponse, {status: SubscriptionStatus, page: number, limit: number}> ({
    query: ({status, page, limit}) => ({
        url: `${SUBSCRIPTION_URL}/my`,
        method: "GET",
        params: {status, page, limit}
    }),
    providesTags: (result, error, id) => [{ type: "Subscription", id: "LIST" }],
   }),

   activateSubscription: builder.mutation<activateSubscriptionResponse,activateSubscriptionRequest>({
    query: ({subscriptionId, paymentId}) => ({
        url: `${SUBSCRIPTION_URL}/activate`,
        method: "POST",
        body: {subscriptionId, paymentId}
    }),
    invalidatesTags: [{ type: "Subscription", id: "LIST" }],
   }),

   cancelSubscription: builder.mutation<cancelSubscriptionResponse, cancelSubscriptionRequest>({
    query: ({subscriptionId, reason}) => ({
        url: `${SUBSCRIPTION_URL}/cancel`,
        method: "POST",
        body: {subscriptionId, reason}
    }),
    invalidatesTags: [{ type: "Subscription", id: "LIST" }],
   })


  }),
});

export const {
 useGetSubscriptionPlansQuery,
 useGetUserSubscriptionsQuery,
 useActivateSubscriptionMutation,
 useCancelSubscriptionMutation,
} = subscriptionApiSlice;
