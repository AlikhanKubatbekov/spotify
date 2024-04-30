import React, {ReactNode} from 'react';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../../features/users/usersSlice';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import AnonymousMenu from './AnonymousMenu';
import MenuIcon from '@mui/icons-material/Menu';
import customDrawerClasses from './customDrawerClasses';
import UserMenu from './UserMenu';

export const TopNavigation: React.FC<{
  children?: ReactNode
  handleDrawerToggle: () => void
}> = ({children, handleDrawerToggle}) => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={customDrawerClasses.appBar}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={customDrawerClasses.menuButton}
          onClick={handleDrawerToggle}
        >
          <MenuIcon/>
        </IconButton>

        {user ? (
          <UserMenu/>
        ) : (
          <AnonymousMenu />
        )}
      </Toolbar>
      {children}
    </AppBar>
  );
};

export default TopNavigation;