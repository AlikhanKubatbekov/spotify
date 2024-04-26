import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import noAlbumImage from '../../../assets/noImageAvailable.png';
import {apiURL} from '../../../constans';

interface Props {
  id: string;
  title: string;
  publicDate: number;
  albumImage: string | null;
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
  albumTitle: {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: "20px"
  },
  publicDate: {
    display: 'inline-block',
    opacity: '0.5'
  }
};

const AlbumItem: React.FC<Props> = ({id, title, publicDate, albumImage}) => {
  let cardImage = noAlbumImage;

  if (albumImage) {
    cardImage = apiURL + '/' + albumImage;
  }

  return (
    <Grid item xs={12} md={6}>
      <Card
        component={Link}
        sx={classes.card}
        to={`/tracks?album=${id}`}
      >
        <CardActionArea>
          <CardMedia
            image={cardImage}
            title={title}
            sx={classes.cardMedia}
          />
          <CardContent
            sx={classes.cardContent}
          >
            <Typography
              variant="body1"
              component="div"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={classes.albumTitle}
              >
                {title}
              </Typography>
              <Typography
                sx={classes.publicDate}
              >
                {publicDate}
              </Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AlbumItem;