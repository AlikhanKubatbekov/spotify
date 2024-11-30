import React from 'react';
import { Avatar, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import noAvatarAvailable from '../../../assets/noAvatarAvailable.png';
import { apiURL } from '../../../constans';

const UserMenu: React.FC = () => {
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
    </Typography>
  );
};

export default UserMenu;
