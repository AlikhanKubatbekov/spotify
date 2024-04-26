import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchTracksByAlbums} from './tracksThunk';
import {selectTracksByAlbum} from './tracksSlice';
import {apiURL} from '../../constans';
import {
  Avatar,
  createTheme,
  Grid,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';
import {grey} from '@mui/material/colors';

const theme = createTheme();

const classes = {
  gridContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  albumImage: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 200,
      width: 200,
    },
  },
  artistName: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  albumName: {
    marginTop: theme.spacing(0.5),
    fontWeight: 'bold',
    color: grey[500],
  },
};

const Tracks: React.FC = () => {
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get('album');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracksByAlbums(albumId));
    }
  }, [dispatch, albumId]);

  const tracksByAlbum = useAppSelector(selectTracksByAlbum);

  const noTracksAvailable = (
    <Typography
      component="p"
      variant="h4"
    >
      There is not a single track on this album!
    </Typography>
  );

  const albumImage = tracksByAlbum.length > 0 && {
    src: tracksByAlbum[0].album.albumImage,
    alt: tracksByAlbum[0].album.title
  };

  const albumOwner = tracksByAlbum.length > 0 && tracksByAlbum[0].album.artist.name;
  const albumName = tracksByAlbum.length > 0 && tracksByAlbum[0].album.title;

  return (
    <>
      {tracksByAlbum.length === 0 ? (
        noTracksAvailable
      ) : (
        <>
          <Grid
            sx={classes.gridContainer}
            container
            spacing={4}
          >
            <Grid item md={4}>
              {albumImage && albumImage.src && (
                <Avatar
                  variant="square"
                  src={apiURL + '/' + albumImage.src}
                  alt={albumImage.alt}
                  sx={classes.albumImage}
                />
              )}
            </Grid>
            <Grid item md={8}>
              <Typography
                component="h2"
                variant="h2"
                sx={classes.artistName}
              >
                {albumOwner}
              </Typography>
              <Typography
                variant="h5"
                sx={classes.albumName}
              >
                {albumName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h3" gutterBottom>
                Tracks:
              </Typography>
              <List style={{width: '100%'}}>
                {tracksByAlbum.map((track) => (
                  <ListItemButton
                    key={track._id}
                    alignItems="flex-start"
                   >
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
                        opacity: "0.5"
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