import React from 'react';
import { apiURL } from '../../../constans';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import noAvatarPhoto from '../../../assets/noImageAvailable.png';
import { Link } from 'react-router-dom';
import artistItemClasses from './artistItemClasses';

interface Props {
  id: string;
  name: string;
  photo: string | null;
}

const ArtistItem: React.FC<Props> = ({ id, name, photo }) => {
  let cardImage = noAvatarPhoto;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card component={Link} sx={artistItemClasses.card} to={`/albums?artist=${id}`}>
        <CardActionArea>
          <CardMedia image={cardImage} title={name} sx={artistItemClasses.cardMedia} />
          <CardContent sx={artistItemClasses.cardContent}>
            <Typography variant="subtitle1" sx={artistItemClasses.artistName}>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArtistItem;
