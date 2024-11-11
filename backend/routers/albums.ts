import { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Album from '../models/Album';
import { IRequestWithUser } from '../types/user';
import { IAlbumMutation } from '../types/album';

const albumsRouter = Router();

albumsRouter.post('/', auth, imagesUpload.single('albumImage'), createAlbum);
albumsRouter.get('/', getAlbums);
albumsRouter.get('/:id', getAlbum);
albumsRouter.patch(':id', auth, permit('admin'), togglePublished);
albumsRouter.delete('/:id', auth, permit('admin'), removeAlbum);

async function createAlbum(req: IRequestWithUser, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      if (!req.body.title || !req.body.artist || !req.body.publicDate) {
        return res.status(400).json({ error: 'Title, artist and public date of album must be present in the request' });
      }

      const albumData: IAlbumMutation = {
        title: req.body.title,
        artist: req.body.artist,
        publicDate: req.body.publicDate,
        albumImage: req.file ? req.file.filename : null,
      };

      const album = new Album(albumData);
      await album.save();

      return res.send(album);
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).json({ error: e });
    }

    next(e);
  }
}

async function getAlbums(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.query.artist) {
      try {
        const artistQueryId = req.query.artist as string;
        const albumsByArtist = await Album.find({ artist: artistQueryId })
          .populate('artist', 'name')
          .populate('publicDate')
          .sort({ publicDate: -1 });

        return res.send(albumsByArtist);
      } catch (e) {
        return res.status(404).send({ error: 'Wrong artist ObjectId' });
      }
    } else {
      const albums = await Album.find().populate('publicDate').sort({ publicDate: -1 });
      return res.send(albums);
    }
  } catch (e) {
    next(e);
  }
}

async function getAlbum(req: Request, res: Response, next: NextFunction) {
  try {
    let _id: ObjectId;
    try {
      _id = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(404).send({ error: 'Wrong album ObjectId' });
    }

    const album = await Album.findById(_id).populate('artist', 'name photo information');

    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    return res.send(album);
  } catch (e) {
    next(e);
  }
}

async function togglePublished(req: Request, res: Response, next: NextFunction) {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);

    if (!album) return res.status(404).send({ error: 'Album not found!' });

    const publishedAlbum = await Album.updateOne(
      {
        _id: albumId,
      },
      {
        $set: {
          isPublished: !album.isPublished,
        },
      },
    );

    if (publishedAlbum.matchedCount === 0) {
      return res.status(404).send({ error: 'Album not found!' });
    }

    return res.send({ message: 'Album successfully published!', publishedAlbum });
  } catch (e) {
    next(e);
  }
}

async function removeAlbum(req: Request, res: Response, next: NextFunction) {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);

    if (!album) return res.status(404).send({ error: 'Album not found!' });

    await Album.findByIdAndDelete({ _id: albumId });

    return res.status(200).send({ message: 'Deleted successfully.' });
  } catch (e) {
    next(e);
  }
}

export default albumsRouter;
