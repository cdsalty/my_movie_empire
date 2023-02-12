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
  const { data } = useGetMoviesQuery();
  console.log('Movies data', data);

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
