import darkTheme from '../../../theme';

export const drawerWidth = 270;

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
  sideDrawerItem: {
    [darkTheme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  drawerIcon: {
    justifyContent: 'flex-end',
    marginRight: '3px',
  },
  menuButton: {
    marginRight: darkTheme.spacing(2),
    [darkTheme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  signUp: {
    color: 'inherit',
    marginLeft: 'auto',
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
