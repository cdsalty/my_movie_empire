import { Search } from '@mui/icons-material';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  // I will use the baseQuery as the base and will add to it for the fetches
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // Get Movies By [type]
    getMovies: builder.query({
      // return the endpoint of the url here
      // query: () => `/movie/popular?page=${page}&api_key=${tmdbApiKey}`, // befor being updated
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get movies by search by adding the correct input
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&{page}&api_key=${tmdbApiKey}`;
        }

        // Get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          console.log('here!');
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // at the start, we will show the popular movies, that is why this is here.
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery } =
  tmdbApi;

// middleware: (getDefaultMiddleware) => {
//   return getDefaultMiddleware().concat(otherMiddleware);
// }

// all of the queries will be coming back from Movies.jsx.... in the data object
