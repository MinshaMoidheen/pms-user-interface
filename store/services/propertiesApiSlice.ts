import { apiSlice } from './apiSlice'
import { PROPERTIES_URL } from '../constants'

import type { getPropertiesResponse, PropertyCategory, PropertyType } from '@/types/properties';

export interface GetPropertiesParams {
  type?: PropertyType
  category?: PropertyCategory
  city?: string
  state?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  page?: number
  limit?: number
}

const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProperties: builder.query<getPropertiesResponse, GetPropertiesParams | void>({
      query: (params) => {
        const p: GetPropertiesParams = params ?? {}
        const { type, category, city, state, minPrice, maxPrice, search, page = 1, limit = 10 } = p
        return {
          url: `${PROPERTIES_URL}`,
          method: 'GET',
          params: { type, category, city, state, minPrice, maxPrice, search, page, limit }
        }
      },
      providesTags: result =>
        result?.data?.properties
          ? [
              ...result.data.properties.map(({ _id }) => ({ type: 'Properties' as const, id: _id })),
              { type: 'Properties', id: 'LIST' }
            ]
          : [{ type: 'Properties', id: 'LIST' }]
    }),
  
  }),
});

export const {
   useGetPropertiesQuery
 } = propertiesApiSlice;

