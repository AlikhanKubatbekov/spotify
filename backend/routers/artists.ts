import express, {Request, Response} from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req: Request, res: Response, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/', imagesUpload.single('photo'), async (req: Request, res: Response, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: 'Name of artist must be present in the request'});
  }

  const artistData: ArtistMutation = {
    name: req.body.name,
    photo: req.file ? req.file.filename : null,
    information: req.body.information
  };

  try {
    const artist = new Artist(artistData);
    await artist.save();

    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

export default artistsRouter