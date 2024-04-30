import darkTheme from '../../../theme';

const tracksHistoryClasses = {
  backToHomeButton: {
    color: 'inherit',
    margin: '20px 0',
    border: '1px solid rgb(255, 255, 255, 0.5)',
    borderRadius: '2px',
    backgroundColor: 'transparent',
    [darkTheme.breakpoints.down('md')]: {
      display: 'flex',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    }
  },
  listItemButton: {
    padding: '3px 0',
    borderTop: '1px solid rgb(204, 204, 204, 0.5)',
    borderBottom: '1px solid rgb(204, 204, 204, 0.5)',
    [darkTheme.breakpoints.only('xs')]: {
      padding: '2px 0',
      marginBottom: '3px',
      border: '1px solid rgb(204, 204, 204, 0.5)'
    }
  },
  datetimeBlock: {
    display: 'inline-block',
    opacity: '0.5',
    fontSize: '0.8rem',
    paddingRight: '5px',
    marginRight: '5px',
    borderRight: '1px solid #fff',
    [darkTheme.breakpoints.only('xs')]: {
      borderRight: 'none',
      borderBottom: '1px solid #fff',
      margin: '0',
      padding: '0 0 2px 5px',
      fontSize: 'inherit'
    }
  },
  trackNameAndArtistBlock: {
    display: 'inline-block',
    [darkTheme.breakpoints.only('xs')]: {
      padding: '2px 0 0 5px'
    }
  },
  listItemInner: {
    [darkTheme.breakpoints.only('xs')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  }
};

export default tracksHistoryClasses;