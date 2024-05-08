import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Typography} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import customDrawerClasses from './customDrawerClasses';

interface Props {
  handleUserLogout: () => void;
}

const UserMenu: React.FC<Props> = ({handleUserLogout}) => {
  return (
    <Typography
      component="div"
      style={{
        marginLeft: 'auto'
      }}>
      <Button
        component={Link}
        sx={customDrawerClasses.recents}
        to="/track_history"
      >
        Recents
        <MenuOutlinedIcon/>
      </Button>
      <Button
        sx={customDrawerClasses.logout}
        onClick={handleUserLogout}
      >
        Log out
        <ExitToAppIcon/>
      </Button>
    </Typography>
  );
};

export default UserMenu;