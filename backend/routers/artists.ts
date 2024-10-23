import express, { NextFunction, Request, Response } from 'express';
import Artist from '../models/Artist';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import { ObjectId } from 'mongodb';
import { ArtistMutation } from '../types';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.post('/', auth, imagesUpload.single('photo'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      if (!req.body.name) {
        return res.status(400).json({ error: 'Name of artist must be present in the request' });
      }

      const artistData: ArtistMutation = {
        name: req.body.name,
        photo: req.file ? req.file.filename : null,
        information: req.body.information,
      };

      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    }
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
      return res.status(404).send({ error: 'Artist id not found!' });
    }
  } catch (e) {
    return res.status(404).send({ error: 'Wrong album ObjectId' });
  }

  try {
    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found!' });
    }

    return res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findById(artistId);

    if (!artist) return res.status(404).send({ error: 'Artist not found!' });

    await Artist.findByIdAndDelete({ _id: artistId });

    return res.status(200).send({ message: 'Deleted successfully.' });
  } catch (e) {
    next(e);
  }
});

export default artistsRouter;
