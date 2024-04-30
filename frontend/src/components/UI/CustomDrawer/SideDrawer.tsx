import React from 'react';
import {Link} from 'react-router-dom';
import {persistor} from '../../../app/store';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../../features/users/usersSlice';
import {Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SpotifyLogo from '../../../assets/spotifyLogo.png';
import {drawerWidth} from './customDrawerClasses';

const SideDrawer: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Typography
      component="div"
      style={{
        width: drawerWidth
      }}>
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

export default SideDrawer;