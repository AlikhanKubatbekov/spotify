import customDrawerClasses from './customDrawerClasses';
import {persistor} from '../../../app/store';
import {Link} from 'react-router-dom';
import {Button, Typography} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const UserMenu = () => {
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
        onClick={() => persistor.purge()}
      >
        Log out
        <ExitToAppIcon/>
      </Button>
    </Typography>
  );
};

export default UserMenu;