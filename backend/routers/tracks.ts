import express, {NextFunction, Request, Response} from 'express';
import {TrackMutation} from '../types';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Track from '../models/Track';
import Artist from '../models/Artist';

const tracksRouter = express.Router();

tracksRouter.post(
  '/',
  auth,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        if (!req.body.trackNumber || !req.body.trackName || !req.body.album || !req.body.trackDuration) {
          return res.status(400).send({error: 'Track number, name, album and track duration is required'});
        }

        const trackData: TrackMutation = {
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
        return res.status(422).json({error: e});
      }

      next(e);
    }
  });

tracksRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.album) {
      try {
        const albumQueryId = req.query.album as string;
        const tracksFromAlbum = await Track
          .find({album: albumQueryId})
          .populate({
            path: 'album',
            populate: {
              path: 'artist',
              model: Artist
            }
          })
          .sort({trackNumber: 1});

        return res.send(tracksFromAlbum);
      } catch (e) {
        return res.status(404).send({error: 'Wrong album ObjectId'});
      }
    } else {
      const tracks = await Track.find();
      return res.send(tracks);
    }
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;