import customDrawerClasses from './customDrawerClasses';
import {persistor} from '../../../app/store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Button, Typography} from '@mui/material';

const UserMenu = () => {
  return (
    <Typography
      component="div"
      style={{
        marginLeft: 'auto'
      }}>
      <Button
        color="inherit"
        sx={customDrawerClasses.logout}
        onClick={() => persistor.purge()}
      >
        <ExitToAppIcon/>
        Log out
      </Button>
    </Typography>
  );
};

export default UserMenu;