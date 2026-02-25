import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";
import { getBrokerProfileResponse, getProfileResponse } from "@/types/user";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getProfile: builder.query<getProfileResponse, void>({
        query: () => ({
            url: `${USER_URL}/profile`,
            method: "GET",
        }),
        providesTags: (result, error, id) => [{ type: "Users", id: "LIST" }],
    }),

    updateProfile: builder.mutation<getProfileResponse, {body: FormData}>({
        query: ({body}) => ({
            url: `${USER_URL}/profile`,
            method: "PUT",
            body,
        }),
        invalidatesTags: (result, error, { body }) => [
            { type: "Users", id: "LIST" },
        ],
    }),

    getBrokerProfile: builder.query<getBrokerProfileResponse, string | undefined>({
        query: (id) => ({
            url: `${USER_URL}/broker/${id}`,
            method: "GET",
        }),
        providesTags: (result, error, id) => [{ type: "Users", id: "LIST" }],
    }),
    

  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBrokerProfileQuery,
} = usersApiSlice;
