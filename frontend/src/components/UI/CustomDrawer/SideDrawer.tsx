import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SpotifyLogo from '../../../assets/spotifyLogo.png';
import customDrawerClasses, { drawerWidth } from './customDrawerClasses';
import UserSideDrawer from './UserSideDrawer';

interface Props {
  handleUserLogout: () => void;
}

const SideDrawer: React.FC<Props> = ({ handleUserLogout }) => {
  return (
    <Typography
      component="div"
      style={{
        width: drawerWidth,
      }}
    >
      <Box style={{ padding: 10, textAlign: 'center' }}>
        <img alt="logo" src={SpotifyLogo} style={{ width: '40%' }} />
      </Box>
      <Divider />
      <List>
        <ListItemButton component={Link} selected to="/">
          <ListItemIcon sx={customDrawerClasses.drawerIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{
              display: 'inline-block',
            }}
          />
        </ListItemButton>
        <UserSideDrawer handleUserLogout={handleUserLogout} />
      </List>
    </Typography>
  );
};

export default SideDrawer;
