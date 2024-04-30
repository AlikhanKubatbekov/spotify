import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {AlbumMutation} from '../types';
import {imagesUpload} from '../multer';
import Album from '../models/Album';

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('albumImage'), async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || !req.body.artist || !req.body.publicDate) {
    return res.status(400).json({error: 'Title, artist and public date of album must be present in the request'});
  }

  const albumData: AlbumMutation = {
    title: req.body.title,
    artist: req.body.artist,
    publicDate: req.body.publicDate,
    albumImage: req.file ? req.file.filename : null,
  };

  try {
    const album = new Album(albumData);
    await album.save();

    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).json({error: e});
    }

    next(e);
  }
});

albumsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.artist) {
      try {
        const artistQueryId = req.query.artist as string;
        const albumsByArtist = await Album
          .find({artist: artistQueryId})
          .populate('artist', 'name')
          .populate('publicDate')
          .sort({publicDate: -1});

        return res.send(albumsByArtist);
      } catch (e) {
        return res.status(404).send({error: 'Wrong artist ObjectId'});
      }
    } else {
      const albums = await Album
        .find()
        .populate('publicDate')
        .sort({publicDate: -1});
      return res.send(albums);
    }
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let _id: ObjectId;
    try {
      _id = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(404).send({error: 'Wrong album ObjectId'});
    }

    const album = await Album
      .findById(_id)
      .populate('artist', 'name photo information');

    if (!album) {
      return res.status(404).json({error: 'Album not found'});
    }

    return res.send(album);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter