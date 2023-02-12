import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
// import MovieList from '../MovieList/MovieList';
// import { useGetMoviesQuery } from '../../services/TMDB.js';

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alighnItems="center" mt="20px">
        <Topography variant="h4">
          No Movies Found
          <br />
          Please try something else
        </Topography>
      </Box>
    );
  }

  if (error) return 'An error has occurred';
  console.log('Movies data', data);

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
