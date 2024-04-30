import darkTheme from '../../../theme';

export const drawerWidth = 300;

const customDrawerClasses = {
  drawer: {
    [darkTheme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [darkTheme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: darkTheme.spacing(2),
    [darkTheme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logout: {
    [darkTheme.breakpoints.only('xs')]: {
      display: 'none',
    }
  },
  signUp: {
    color: 'inherit',
    marginLeft: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: darkTheme.spacing(3),
    [darkTheme.breakpoints.only('xs')]: {
      paddingLeft: darkTheme.spacing(1),
      paddingRight: darkTheme.spacing(1),
    },
  },
  toolbar: darkTheme.mixins.toolbar,
};

export default customDrawerClasses;