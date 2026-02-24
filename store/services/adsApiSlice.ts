import { apiSlice } from "./apiSlice";
import { ADS_URL } from "../constants";
import { createAdRequest, createAdResponse} from "@/types/ads";

const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

   createAdRequest: builder.mutation<createAdResponse, createAdRequest>({
    query: (adData) => ({
        url: `${ADS_URL}`,
        method: "POST",
        body: adData
    }),
    invalidatesTags: (result, error, id) => [{ type: "Ads", id: "LIST" }],
   }),

  }),
});

export const {
    useCreateAdRequestMutation,
} = adsApiSlice;
