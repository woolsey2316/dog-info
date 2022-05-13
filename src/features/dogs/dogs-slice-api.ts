import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const DOGS_API_KEY = '892a5907-8d8a-4fc5-80f8-1496b219fb3e'

interface Breed {
    life_span: string;
    origin: string;
    breed_group: string;
    bred_for: string;
    weight: {imperial: string, metric: string};
    id: string;
    name: string;
    image: {
        url: string
    }
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1', 
        prepareHeaders(headers) {
            headers.set('x-api-key', DOGS_API_KEY)
            return headers
        }
    }),
    endpoints(builder) {
        return {
            fetchBreeds: builder.query<Breed[], number|void> ({
                query(limit = 10) {
                    return `/breeds?limit=${limit}`
                } 
            })
        }
    }
})

export const { useFetchBreedsQuery } = apiSlice