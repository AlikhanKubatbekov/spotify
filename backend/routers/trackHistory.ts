import express, { NextFunction, Response } from 'express';
import { Error } from 'mongoose';
import dayjs from 'dayjs';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import Artist from '../models/Artist';
import Track from '../models/Track';
import { Album } from '../types';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.body.track) {
    return res.status(400).json({ error: 'Track id must be present in request!' });
  }

  try {
    const currentDatetime = new Date().toISOString();
    const track = (await Track.findOne({ _id: req.body.track })
      .populate({
        path: 'album',
        populate: {
          path: 'artist',
          select: '_id',
        },
      })
      .exec()) as Track & { album: Album & { artist: Artist } };

    if (!track) return res.status(400).json({ error: 'Track not found' });

    const artistId = track.album.artist._id;
    if (!artistId) return res.status(400).json({ error: 'Artist not found' });

    const trackHistoryData = {
      user: req.user?._id,
      track: req.body.track,
      artist: artistId,
      datetime: currentDatetime,
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).json({ error: e });
    }

    next(e);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const trackHistories = await TrackHistory.find({ user: req.user._id })
        .sort({ datetime: -1 })
        .populate({
          path: 'artist',
          select: 'name',
        })
        .populate({
          path: 'track',
          select: 'trackName',
        })
        .exec();

      const formatTrackHistoryDates = (trackHistories: TrackHistory[]) => {
        return trackHistories.map((trackHistory: TrackHistory) => {
          const { _id, user, track, artist, datetime } = trackHistory;
          return {
            _id,
            user,
            track,
            artist,
            datetime: dayjs(datetime).format('HH:mm:ss DD-MM-YYYY'),
          };
        });
      };

      const formattedTrackHistories = formatTrackHistoryDates(trackHistories);
      return res.send(formattedTrackHistories);
    } else {
      return res.status(400).json({ error: 'You must be logged in!' });
    }
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;
