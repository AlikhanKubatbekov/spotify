import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {Link} from 'react-router-dom';
import {selectUser} from '../../users/usersSlice';
import {fetchTracksHistories} from './tracksHistoriesThunk';
import {selectTracksHistory} from './tracksHistoriesSlice';
import {Button, Grid, List, ListItemButton, ListItemSecondaryAction, ListItemText, Typography} from '@mui/material';
import tracksHistoryClasses from './tracksHistoryClasses';

const TracksHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchTracksHistories());
    }
  }, [dispatch, user]);

  const trackHistory = useAppSelector(selectTracksHistory);

  return (
    <>
      <Typography
        component="h2"
        variant="h4"
      >
        Hello, {user?.displayName}
      </Typography>
      <Grid item xs={12}>
        <Typography
          component="h3"
          variant="h5"
          marginY="10px"
          style={{opacity: '0.5'}}
        >
          {trackHistory.length > 0 ? 'Your recent:' : 'You have not listened to any tracks yet!'}
        </Typography>

        {trackHistory.length === 0 && (
          <Button
            component={Link}
            variant="contained"
            to="/"
            sx={tracksHistoryClasses.backToHomeButton}
          >
            Back to Home
          </Button>
        )}

        <List style={{width: '100%'}}>
          {trackHistory.map((listenedTrack) => (
            <ListItemButton
              key={listenedTrack._id}
              alignItems="center"
              sx={tracksHistoryClasses.listItemButton}
            >
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    sx={tracksHistoryClasses.datetimeBlock}>
                    {listenedTrack.datetime.toString()}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={tracksHistoryClasses.trackNameAndArtistBlock}
                  >
                    {listenedTrack.track.trackName} - {listenedTrack.artist?.name}
                  </Typography>
                }
                disableTypography
                sx={tracksHistoryClasses.listItemInner}
              />
              <ListItemSecondaryAction
                style={{opacity: '0.5'}}
              >
                {listenedTrack.track.trackDuration}
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default TracksHistory;