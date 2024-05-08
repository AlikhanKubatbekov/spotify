import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectTracksByAlbum} from './tracksSlice';
import {selectUser} from '../../users/usersSlice';
import {fetchTracksByAlbums} from './tracksThunk';
import {addTrackToHistory} from '../TracksHistories/tracksHistoriesThunk';
import {apiURL} from '../../../constans';
import {
  Avatar,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import tracksClasses from './tracksClasses';

const Tracks: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const albumId = searchParams.get('album');
  const user = useAppSelector(selectUser);
  const tracksByAlbum = useAppSelector(selectTracksByAlbum);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracksByAlbums(albumId));
    }
  }, [dispatch, albumId]);

  const addTrackToHistoryHandler = (trackId: string) => {
    dispatch(addTrackToHistory(trackId));
  };

  const albumImage = tracksByAlbum.length > 0 && {
    src: tracksByAlbum[0].album.albumImage,
    alt: tracksByAlbum[0].album.title
  };

  const albumOwner = tracksByAlbum.length > 0 && tracksByAlbum[0].album.artist.name;
  const albumName = tracksByAlbum.length > 0 && tracksByAlbum[0].album.title;

  const noTracksAvailable = (
    <Typography
      component="p"
      variant="h4"
    >
      There is not a single track on this album!
    </Typography>
  );

  return (
    <>
      {tracksByAlbum.length === 0 ? (
        noTracksAvailable
      ) : (
        <>
          <Grid
            sx={tracksClasses.gridContainer}
            container
            spacing={4}
          >
            <Grid item md={4}>
              {albumImage && albumImage.src && (
                <Avatar
                  variant="square"
                  src={apiURL + '/' + albumImage.src}
                  alt={albumImage.alt}
                  sx={tracksClasses.albumImage}
                />
              )}
            </Grid>
            <Grid item md={8}>
              <Typography
                component="h2"
                variant="h2"
                sx={tracksClasses.artistName}
              >
                {albumOwner}
              </Typography>
              <Typography
                variant="h5"
                sx={tracksClasses.albumName}
              >
                {albumName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Tracks:
              </Typography>
              <List style={{width: '100%'}}>
                {tracksByAlbum.map((track) => (
                  <ListItemButton
                    key={track._id}
                    alignItems="center"
                  >
                    <ListItemButton
                      sx={{
                        flexBasis: '60px',
                        flexGrow: '0'
                      }}
                      onClick={user ? () => addTrackToHistoryHandler(track._id) : undefined}
                    >
                      <ListItemIcon>
                        <PlayArrowIcon/>
                      </ListItemIcon>
                    </ListItemButton>
                    <ListItemText
                      primary={
                        <>
                          {track.trackNumber}.
                        </>
                      }
                      secondary={track.trackName}
                      disableTypography
                    />
                    <ListItemSecondaryAction
                      style={{
                        opacity: '0.5'
                      }}
                    >
                      {track.trackDuration}
                    </ListItemSecondaryAction>
                  </ListItemButton>
                ))}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Tracks;