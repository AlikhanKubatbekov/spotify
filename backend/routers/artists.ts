import express, {Request, Response, NextFunction} from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';
import {ObjectId} from 'mongodb';

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('photo'), async (req: Request, res: Response, next: NextFunction) => {
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

artistsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  let _id: ObjectId;

  try {
    _id = new ObjectId(req.params.id);
    if (!_id) {
      return res.status(404).send({error: 'Artist id not found!'});
    }
  } catch (e) {
    return res.status(404).send({error: 'Wrong album ObjectId'});
  }

  try {
    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found!'});
    }

    return res.send(artist);
  } catch (e){
    next(e);
  }
});

export default artistsRouter