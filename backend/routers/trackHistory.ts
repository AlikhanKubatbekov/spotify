import { NextFunction, Response, Router } from 'express';
import dayjs from 'dayjs';
import { Error } from 'mongoose';
import auth from '../middleware/auth';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import { IRequestWithUser } from '../types/user';
import { ITrackHistory } from '../types/trackHistory';
import { ITrack } from '../types/track';
import { IAlbum } from '../types/album';
import { IArtist } from '../types/artist';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', auth, addTrackToHistory);
trackHistoryRouter.get('/', auth, getTrackHistory);

async function addTrackToHistory(req: IRequestWithUser, res: Response, next: NextFunction) {
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
      .exec()) as ITrack & { album: IAlbum & { artist: IArtist } };

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
}

async function getTrackHistory(req: IRequestWithUser, res: Response, next: NextFunction) {
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

      const formatTrackHistoryDates = (trackHistories: ITrackHistory[]) => {
        return trackHistories.map((trackHistory: ITrackHistory) => {
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
}

export default trackHistoryRouter;
