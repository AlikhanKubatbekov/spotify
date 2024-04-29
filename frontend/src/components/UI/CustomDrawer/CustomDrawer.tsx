import React, {ReactNode, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../app/hooks';
import {selectFetchArtistsLoading} from '../../../features/artists/artistsSlice';
import {selectFetchAlbumsLoading} from '../../../features/albums/albumsSlice';
import {selectFetchTracksLoading} from '../../../features/tracks/tracksSlice';
import {selectLoginLoading, selectRegisterLoading, selectUser} from '../../../features/users/usersSlice';
import {
  AppBar,
  Box,
  Button,
  createTheme,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import AnonymousMenu from './AnonymousMenu';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SpotifyLogo from '../../../assets/spotifyLogo.png';
import {persistor} from '../../../app/store';

const theme = createTheme();
const drawerWidth = 300;

const classes = {
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logout: {
    marginLeft: 'auto',
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    }
  },
  signUp: {
    color: 'inherit',
    marginLeft: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  toolbar: theme.mixins.toolbar,
};

const SideDrawer: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Typography component="div" style={{width: drawerWidth}}>
      <Box style={{padding: 10, textAlign: 'center'}}>
        <img
          alt="logo"
          src={SpotifyLogo}
          style={{width: '40%'}}
        />
      </Box>
      <Divider/>
      <List>
        <ListItemButton
          component={Link}
          selected
          to="/"
        >
          <ListItemIcon
            sx={{
              justifyContent: 'flex-end',
              marginRight: '3px'
            }}
          >
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{
              display: 'inline-block'
            }}
          />
        </ListItemButton>

        {user && (
          <Typography
            component="div"
            sx={{display: {sm: 'none', xs: 'block'}}}
          >
            <ListItemButton
              component={Link}
              to="/"
              onClick={() => persistor.purge()}
            >
              <ListItemIcon
                style={{
                  justifyContent: 'flex-end',
                  marginRight: '3px'
                }}
              >
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary="Log out"/>
            </ListItemButton>
          </Typography>
        )}
      </List>
    </Typography>
  );
};

export const TopNavigation: React.FC<{
  children?: ReactNode
  handleDrawerToggle: () => void
}> = ({children, handleDrawerToggle}) => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={classes.appBar}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={classes.menuButton}
          onClick={handleDrawerToggle}
        >
          <MenuIcon/>
        </IconButton>

        <Typography
          component="div"
          style={{
            marginLeft: "auto"
          }}
        >
          {!user && (
            <AnonymousMenu />
          )}
        </Typography>

        {user && (
          <Button
            color="inherit"
            sx={classes.logout}
            onClick={() => persistor.purge()}
          >
            <ExitToAppIcon/>
            Log out
          </Button>
        )}
      </Toolbar>
      {children}
    </AppBar>
  );
};

const CustomDrawer: React.FC<React.PropsWithChildren> = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const fetchArtistLoading = useAppSelector(selectFetchArtistsLoading);
  const fetchAlbumsLoading = useAppSelector(selectFetchAlbumsLoading);
  const fetchTrackLoading = useAppSelector(selectFetchTracksLoading);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const loginLoading = useAppSelector(selectLoginLoading);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Typography
      component="div"
      style={{display: 'flex'}}
    >
      <TopNavigation handleDrawerToggle={handleDrawerToggle}>
        {fetchArtistLoading && (
          <Box style={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        )}

        {fetchAlbumsLoading && (
          <Box style={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        )}

        {fetchTrackLoading && (
          <Box style={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        )}

        {registerLoading && (
          <Box style={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        )}

        {loginLoading && (
          <Box style={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        )}
      </TopNavigation>

      <Typography
        component="nav"
        sx={classes.drawer}
      >
        <Typography
          component="div"
          sx={{display: {sm: 'none', xs: 'block'}}}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <SideDrawer/>
          </Drawer>
        </Typography>

        <Typography
          component="div"
          sx={{display: {xs: 'none', sm: 'block'}}}
        >
          <Drawer
            open
            variant="permanent"
          >
            <SideDrawer/>
          </Drawer>
        </Typography>
      </Typography>

      <Typography
        component="main"
        sx={classes.content}>
        <Typography component="div" sx={classes.toolbar}/>
        {children}
      </Typography>
    </Typography>
  );
};

export default CustomDrawer;