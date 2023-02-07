import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    // the following will only show on devices smaller than small (mobile devices...)
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2), // theme.spacing(2) is 8px that will give all the same spacing.
    // backgroundColor: 'green',
    // the following will only show on devices higher than small (NOT mobile devices...)
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      // backgroundColor: 'red',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    linkButton: {
      '&:hover': {
        color: 'white !important',
        textDecoration: 'none',
      },
    },
  },
}));

// the theme gives us access to certain colors, background colors, widths, mobile responsiveness, etc.
