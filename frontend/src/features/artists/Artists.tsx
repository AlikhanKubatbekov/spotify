import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchArtists} from './artistsThunk';
import {selectArtists} from './artistsSlice';
import {Grid, Typography} from '@mui/material';
import ArtistItem from './components/ArtistItem';

const Artists: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const artists = useAppSelector(selectArtists);

  const noArtistsAvailable = (
    <Typography
      component="p"
      variant="h4"
    >
      There is not one artist at the moment...
    </Typography>
  );

  return (
    <>
      {artists.length === 0 ? (
        noArtistsAvailable
      ) : (
        <Grid container spacing={4}>
          {artists.map(artist => (
            <ArtistItem
              key={artist._id}
              name={artist.name}
              photo={artist.photo}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Artists;