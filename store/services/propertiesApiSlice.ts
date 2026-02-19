import { apiSlice } from './apiSlice'
import { PROPERTIES_URL } from '../constants'

import type { getPropertiesParams, getPropertiesResponse } from '@/types/properties';

const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProperties: builder.query<getPropertiesResponse, getPropertiesParams>({
        query: ({type, category, city, state, minPrice, maxPrice, search, page = 1, limit = 10}) => ({
            url: `${PROPERTIES_URL}/register`,
            method: 'GET',
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
            },
        }),
    }),
  
  }),
});

export const {
   useGetPropertiesQuery
 } = propertiesApiSlice;

