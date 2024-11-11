import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbumsByArtist } from './albumsThunk';
import { selectAlbumsByArtist } from './albumsSlice';
import { fetchArtistById } from '../artists/artistsThunk';
import { selectArtist } from '../artists/artistsSlice';
import { Grid, Typography } from '@mui/material';
import AlbumItem from './AlbumItem/AlbumItem';

const Albums: React.FC = () => {
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artist');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbumsByArtist(artistId));
      dispatch(fetchArtistById(artistId));
    }
  }, [dispatch, artistId]);

  const albumsByArtist = useAppSelector(selectAlbumsByArtist);
  const albumsOwner = useAppSelector(selectArtist);

  const noAlbumsAvailable = (
    <Typography component="p" variant="h4">
      This artist do not have any album!
    </Typography>
  );

  return (
    <>
      {albumsByArtist.length === 0 ? (
        noAlbumsAvailable
      ) : (
        <>
          <Typography component="h2" variant="h3">
            {albumsOwner?.name}
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            style={{
              opacity: '0.5',
            }}
          >
            Albums
          </Typography>
          <Grid container spacing={4}>
            {albumsByArtist.map((album) => (
              <AlbumItem key={album._id} id={album._id} title={album.title} publicDate={album.publicDate} albumImage={album.albumImage} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Albums;
