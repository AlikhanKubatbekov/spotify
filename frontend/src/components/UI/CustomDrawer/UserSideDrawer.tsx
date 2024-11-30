import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import customDrawerClasses from './customDrawerClasses';

interface Props {
  handleUserLogout: () => void;
}

const UserSideDrawer: React.FC<Props> = ({ handleUserLogout }) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {user && (
        <>
          <ListItemButton component={Link} to="/track_history" sx={customDrawerClasses.sideDrawerItem}>
            <ListItemIcon sx={customDrawerClasses.drawerIcon}>
              <MenuOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Recent" />
          </ListItemButton>

          <ListItemButton sx={customDrawerClasses.sideDrawerItem} onClick={handleUserLogout}>
            <ListItemIcon sx={customDrawerClasses.drawerIcon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>

          <Typography component="div" sx={{ display: { sm: 'none', xs: 'block' } }}>
            <ListItemButton component={Link} to="/track_history">
              <ListItemIcon sx={customDrawerClasses.drawerIcon}>
                <MenuOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Recent" />
            </ListItemButton>
            <ListItemButton onClick={handleUserLogout}>
              <ListItemIcon sx={customDrawerClasses.drawerIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </Typography>
        </>
      )}
    </>
  );
};

export default UserSideDrawer;
