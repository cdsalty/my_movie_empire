import React from 'react';
import { Grid } from '@mui/material';
import Movie from '../Movie/Movie';
import useStyles from './styles';

const MovieList = ({ movies }) => {
  const classes = useStyles();
  // console.log('MovieList', movies);

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </Grid>
  );
};

export default MovieList;

{
  /* {movies.results.map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))} */
}
