import { NextFunction, Request, Response, Router } from 'express';
import Artist from '../models/Artist';
import auth from '../middleware/auth';
import { imagesUpload } from '../multer';
import { ObjectId } from 'mongodb';
import permit from '../middleware/permit';
import { IRequestWithUser } from '../types/user';
import { IArtistMutation } from '../types/artist';

const artistsRouter = Router();

artistsRouter.post('/', auth, imagesUpload.single('photo'), createArtist);
artistsRouter.get('/', getArtists);
artistsRouter.get('/:id', getArtist);
artistsRouter.patch('/:id', auth, permit('admin'), togglePublished);
artistsRouter.delete('/:id', auth, permit('admin'), removeArtist);

async function createArtist(req: IRequestWithUser, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      if (!req.body.name) {
        return res.status(400).json({ error: 'Name of artist must be present in the request' });
      }

      const artistData: IArtistMutation = {
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
}

async function getArtists(_req: Request, res: Response, next: NextFunction) {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
}

async function getArtist(req: Request, res: Response, next: NextFunction) {
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
}

async function togglePublished(req: Request, res: Response, next: NextFunction) {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findById(artistId);

    if (!artist) return res.status(404).send({ error: 'Artist not found!' });

    const publishedArtist = await Artist.updateOne(
      {
        _id: artistId,
      },
      {
        $set: {
          isPublished: !artist.isPublished,
        },
      },
    );

    if (publishedArtist.matchedCount === 0) {
      return res.status(404).send({ error: 'Artist not found!' });
    }

    return res.send({ message: 'Artist successfully published!', publishedArtist });
  } catch (e) {
    next(e);
  }
}

async function removeArtist(req: Request, res: Response, next: NextFunction) {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findById(artistId);

    if (!artist) return res.status(404).send({ error: 'Artist not found!' });

    await Artist.findByIdAndDelete({ _id: artistId });

    return res.status(200).send({ message: 'Deleted successfully.' });
  } catch (e) {
    next(e);
  }
}

export default artistsRouter;
