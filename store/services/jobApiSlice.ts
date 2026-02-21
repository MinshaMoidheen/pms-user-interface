import { apiSlice } from "./apiSlice";
import { JOBS_URL } from "../constants";

import type {
  EmploymentType,
  getJobPostsResponse,
  getJobPostByIdResponse,
  applyJobResponse,
  getMyApplicationsResponse,
  applyJobRequest,
} from "@/types/jobs";

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

    getJobById: builder.query<getJobPostByIdResponse, string | undefined>({
      query: (id) => ({ url: `${JOBS_URL}/${id}` }),
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),

    applyJob: builder.mutation<
      applyJobResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `${JOBS_URL}/${id}/apply`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Applications", id: "LIST" },
        { type: "Jobs", id },
      ],
    }),

    getMyApplications: builder.query<getMyApplicationsResponse, {page: number; limit: number}>({
      query: ({page = 1, limit = 10}) => ({
        url: `${JOBS_URL}/my-applications`,
        method: "GET",
        params: {
            page,
            limit
        }
      }),
      providesTags: (result) =>
        result?.data?.applications
          ? [
              ...result.data.applications.map(({ _id }) => ({
                type: "Applications" as const,
                id: _id,
              })),
              { type: "Applications", id: "LIST" },
            ]
          : [{ type: "Applications", id: "LIST" }],
    }),
  }),
});

export const {
  useGetJobPostsQuery,
  useGetJobByIdQuery,
  useApplyJobMutation,
  useGetMyApplicationsQuery,
} = jobApiSlice;
