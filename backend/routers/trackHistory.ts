import express, {NextFunction, Response} from 'express';
import {Error} from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.body.track) {
    return res.status(400).json({error: 'Track id must be present in request!'})
  }

  try {
    const datetime = new Date();

    const trackHistory = new TrackHistory({
      user: req.user?._id,
      track: req.body.track,
      datetime: datetime.toISOString(),
    });

    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).json({error: e});
    }

    next(e);
  }
});

export default trackHistoryRouter;