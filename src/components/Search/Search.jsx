import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { searchMovie } from '../../features/currentGenreOrCategory';
import useStyles from './styles';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  console.log('Search Component');
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;

/*
The useLocation hook provides access to the current URL location in a React component. 
It returns an object that contains the current pathname, search parameters, hash fragment, and state. 
This hook is particularly useful for accessing the current URL location and extracting information from the URL parameters.


if the user presses enter, then we want to dispatch the searchMovie action, being sure to pass in the query searched...
*/
