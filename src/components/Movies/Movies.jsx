import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
// import MovieList from '../MovieList/MovieList';
// import { useGetMoviesQuery } from '../../services/TMDB.js';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
  });
  // console.log('Movies component data', data.results);
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
  console.log('Movies data', data, error); // data is an object with a results array

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
