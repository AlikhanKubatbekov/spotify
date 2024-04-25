import React from 'react';
import {apiURL} from '../../../constans';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import noAvatarPhoto from '../../../assets/noImageAvailable.png';
import {Link} from 'react-router-dom';

interface Props {
  id: string;
  name: string;
  photo: string | null;
}

const classes = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
    height: 160,
  },
  cardContent: {
    flexGrow: 1,
  },
  artistName: {
    fontWeight: 'bold',
  },
};

const ArtistItem: React.FC<Props> = ({id, name, photo}) => {
  let cardImage = noAvatarPhoto;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        component={Link}
        sx={classes.card}
        to={`/albums?artist=${id}`}
      >
        <CardActionArea>
          <CardMedia
            image={cardImage}
            title={name}
            sx={classes.cardMedia}
          />
          <CardContent
            sx={classes.cardContent}>
            <Typography
              variant="subtitle1"
              sx={classes.artistName}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArtistItem;