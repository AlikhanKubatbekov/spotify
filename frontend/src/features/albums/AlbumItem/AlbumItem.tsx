import React from 'react';
import { Link } from 'react-router-dom';
import { apiURL } from '../../../constans';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import noAlbumImage from '../../../assets/noImageAvailable.png';
import albumItemClasses from './albumItemClasses';

interface Props {
  id: string;
  title: string;
  publicDate: number;
  albumImage: string | null;
}

const AlbumItem: React.FC<Props> = ({ id, title, publicDate, albumImage }) => {
  let cardImage = noAlbumImage;

  if (albumImage) {
    cardImage = apiURL + '/' + albumImage;
  }

  return (
    <Grid item xs={12} md={6}>
      <Card component={Link} sx={albumItemClasses.card} to={`/tracks?album=${id}`}>
        <CardActionArea>
          <CardMedia image={cardImage} title={title} sx={albumItemClasses.cardMedia} />
          <CardContent sx={albumItemClasses.cardContent}>
            <Typography
              variant="body1"
              component="div"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={albumItemClasses.albumTitle}>{title}</Typography>
              <Typography sx={albumItemClasses.publicDate}>{publicDate}</Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AlbumItem;
