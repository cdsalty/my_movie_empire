import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// const tmdbApiKey = process.env.TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get Movies By [type]
    getMovies: builder.query({
      // return the endpoint of the url here
      query: () => `/movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;

// middleware: (getDefaultMiddleware) => {
//   return getDefaultMiddleware().concat(otherMiddleware);
// }
