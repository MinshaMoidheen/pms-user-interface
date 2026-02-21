import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";
import { getProfileResponse } from "@/types/user";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getProfile: builder.query<getProfileResponse, void>({
        query: () => ({
            url: `${USER_URL}/profile`,
            method: "GET",
        }),
        providesTags: (result, error, id) => [{ type: "Users", id: "LIST" }],
    }),

    updateUser: builder.mutation<getProfileResponse, {id: string, body: FormData}>({
        query: ({id, body}) => ({
            url: `${USER_URL}/${id}`,
            method: "PUT",
            body,
        }),
        invalidatesTags: (result, error, { id }) => [
            { type: "Users", id },
            { type: "Users", id: "LIST" },
        ],
    })
    

  }),
});

export const {
  useGetProfileQuery,
  useUpdateUserMutation
} = usersApiSlice;
