import { apiSlice } from "./apiSlice";
import { JOBS_URL,} from "../constants";

import type { EmploymentType, getJobPostsResponse, getJobPostByIdResponse } from "@/types/jobs";

export interface GetJobsParams {
  city?: string;
  state?: string;
  employmentType?: EmploymentType;
  search?: string;
  page?: number;
  limit?: number;
}

const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({


    getJobPosts: builder.query<getJobPostsResponse, GetJobsParams | void>({
      query: (params) => {
        const p: GetJobsParams = params ?? {};
        const { city, state, employmentType, search, page = 1, limit = 10 } = p;
        return {
          url: `${JOBS_URL}`,
          method: "GET",
          params: {
            city,
            state,
            employmentType,
            search,
            page,
            limit,
          },
        };
      },
      providesTags: (result) =>
        result?.data?.jobs
          ? [
              ...result.data.jobs.map(({ _id }) => ({
                type: "Jobs" as const,
                id: _id,
              })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),

    getJobById: builder.query<getJobPostByIdResponse, string | undefined>(
      {
        query: (id) => ({ url: `${JOBS_URL}/${id}` }),
        providesTags: (result, error, id) => [{ type: "Jobs", id }],
      },
    ),
  }),
});

export const { useGetJobPostsQuery, useGetJobByIdQuery } =
  jobApiSlice;
