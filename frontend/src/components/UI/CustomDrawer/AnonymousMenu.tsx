import { Link as NavLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const AnonymousMenu = () => {
  return (
    <Typography
      component="div"
      style={{
        marginLeft: 'auto',
      }}
    >
      <Button
        component={NavLink}
        color="inherit"
        to="/register"
        style={{
          gap: '5px',
          marginRight: '5px',
        }}
      >
        Sign up
        <PersonAddIcon />
      </Button>
      <Button
        component={NavLink}
        color="inherit"
        to="/login"
        style={{
          gap: '5px',
        }}
      >
        Sign in
        <LoginIcon />
      </Button>
    </Typography>
  );
};

export default AnonymousMenu;
