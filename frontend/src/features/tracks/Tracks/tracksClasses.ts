import darkTheme from '../../../theme';
import {grey} from '@mui/material/colors';

const tracksClasses = {
  gridContainer: {
    [darkTheme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  albumImage: {
    height: '100%',
    width: '100%',
    [darkTheme.breakpoints.down('sm')]: {
      height: 200,
      width: 200,
    },
  },
  artistName: {
    fontWeight: 'bold',
    [darkTheme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  albumName: {
    marginTop: darkTheme.spacing(0.5),
    fontWeight: 'bold',
    color: grey[500],
  }
};

export default tracksClasses;