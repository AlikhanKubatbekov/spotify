import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import noAvatarAvailable from '../../../assets/noAvatarAvailable.png';
import customDrawerClasses from './customDrawerClasses';
import { apiURL } from '../../../constans';

interface Props {
  handleUserLogout: () => void;
}

const UserMenu: React.FC<Props> = ({ handleUserLogout }) => {
  const user = useAppSelector(selectUser);
  let avatarImage = noAvatarAvailable;
  if (user?.avatar) avatarImage = `${apiURL}/${user.avatar}`;

  return (
    <Typography
      component="div"
      style={{
        display: 'flex',
        marginLeft: 'auto',
        alignItems: 'center',
      }}
    >
      <Typography
        component="div"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar alt={user ? user.displayName : 'Anonymous user'} src={user?.googleId ? user?.avatar || undefined : avatarImage} />
        <Typography
          paragraph
          variant="h6"
          style={{
            fontSize: '1rem',
            margin: '0',
          }}
        >
          {user?.displayName}
        </Typography>
      </Typography>

      <Button component={Link} sx={customDrawerClasses.recents} to="/track_history">
        Recent
        <MenuOutlinedIcon />
      </Button>
      <Button sx={customDrawerClasses.logout} onClick={handleUserLogout}>
        Log out
        <ExitToAppIcon />
      </Button>
    </Typography>
  );
};

export default UserMenu;
