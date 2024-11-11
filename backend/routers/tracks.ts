import { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Artist from '../models/Artist';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { IRequestWithUser } from '../types/user';
import { ITrackMutation } from '../types/track';

const tracksRouter = Router();

tracksRouter.post('/', auth, createTrack);
tracksRouter.get('/', getTracks);
tracksRouter.patch(':id', auth, permit('admin'), togglePublished);
tracksRouter.delete('/:id', auth, permit('admin'), removeTrack);

async function createTrack(req: IRequestWithUser, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      if (!req.body.trackNumber || !req.body.trackName || !req.body.album || !req.body.trackDuration) {
        return res.status(400).send({ error: 'Track number, name, album and track duration is required' });
      }

      const trackData: ITrackMutation = {
        trackNumber: req.body.trackNumber,
        trackName: req.body.trackName,
        album: req.body.album,
        trackDuration: req.body.trackDuration,
      };

      const track = new Track(trackData);
      await track.save();

      return res.send(track);
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).json({ error: e });
    }

    next(e);
  }
}

async function getTracks(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.query.album) {
      try {
        const albumQueryId = req.query.album as string;
        const tracksFromAlbum = await Track.find({ album: albumQueryId })
          .populate({
            path: 'album',
            populate: {
              path: 'artist',
              model: Artist,
            },
          })
          .sort({ trackNumber: 1 });

        return res.send(tracksFromAlbum);
      } catch (e) {
        return res.status(404).send({ error: 'Wrong album ObjectId' });
      }
    } else {
      const tracks = await Track.find();
      return res.send(tracks);
    }
  } catch (e) {
    next(e);
  }
}

async function togglePublished(req: Request, res: Response, next: NextFunction) {
  try {
    const trackId = req.params.id;
    const track = await Track.findById(trackId);

    if (!track) return res.status(404).send({ error: 'Track not found!' });

    const publishedTrack = await Track.updateOne(
      {
        _id: trackId,
      },
      {
        $set: {
          isPublished: !track.isPublished,
        },
      },
    );

    if (publishedTrack.matchedCount === 0) {
      return res.status(404).send({ error: 'Track not found!' });
    }

    return res.send({ message: 'Track successfully published!', publishedTrack });
  } catch (e) {
    next(e);
  }
}

async function removeTrack(req: Request, res: Response, next: NextFunction) {
  try {
    const trackId = req.params.id;
    const track = await Track.findById(trackId);

    if (!track) return res.status(404).send({ error: 'Track not found!' });

    await Track.findByIdAndDelete({ _id: trackId });

    return res.status(200).send({ message: 'Deleted successfully.' });
  } catch (e) {
    next(e);
  }
}

export default tracksRouter;
