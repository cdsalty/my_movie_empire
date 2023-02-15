import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  CircularProgress,
  ListItemIcon,
  Box,
  BircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching, error } = useGetGenresQuery();
  console.log('SIDEBAR data', data);
  const dispatch = useDispatch();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Movie Empire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          // what to display?
          <Link key={value} className={classes.links} to={`/`}>
            <ListItem
              button
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {/* destructure the label and value from demoCategories */}
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            // what to display?
            <Link key={name} className={classes.links} to={`/`}>
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default SideBar;
