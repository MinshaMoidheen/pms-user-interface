import { apiSlice } from "./apiSlice";
import { PROPERTIES_URL } from "../constants";

import type {
  getPropertiesResponse,
  IProperty,
  PropertyCategory,
  PropertyType,
} from "@/types/properties";

export interface GetPropertiesParams {
  type?: PropertyType;
  category?: PropertyCategory;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  rooms?: number | "Any";
  beds?: number | "Any";
  bathrooms?: number | "Any";
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
}

const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<
      getPropertiesResponse,
      GetPropertiesParams | void
    >({
      query: (params) => {
        const p: GetPropertiesParams = params ?? {};
        const {
          type,
          category,
          city,
          state,
          minPrice,
          maxPrice,
          search,
          page = 1,
          limit = 10,
          startDate,
          endDate,
          rooms,
          beds,
          bathrooms,
          minArea,
          maxArea,
          amenities,
        } = p;
        return {
          url: `${PROPERTIES_URL}`,
          method: "GET",
          params: {
            type,
            category,
            city,
            state,
            minPrice,
            maxPrice,
            search,
            page,
            limit,
            startDate,
            endDate,
            rooms,
            beds,
            bathrooms,
            minArea,
            maxArea,
            amenities,
          },
        };
      },
      providesTags: (result) =>
        result?.data?.properties
          ? [
              ...result.data.properties.map(({ _id }) => ({
                type: "Properties" as const,
                id: _id,
              })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),

    getProperty: builder.query<IProperty, string>({
      query: (id) => ({ url: `${PROPERTIES_URL}/${id}` }),
      providesTags: (result, error, id) => [{ type: "Properties", id }],
    }),
  }),
});

export const { useGetPropertiesQuery, useGetPropertyQuery } =
  propertiesApiSlice;
