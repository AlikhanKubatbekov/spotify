import express, {Request, Response} from 'express';
import {Error} from 'mongoose';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req: Request, res: Response, next) => {
  if (!req.body.trackId) {
    return res.status(400).json({error: 'Track id must be present in request!'})
  }

  try {
    const tokenData = req.get('Authorization');
    const datetime = new Date();

    if (!tokenData) {
      return res.status(401).send({error: 'No token present!'});
    }

    const [_, token] = tokenData.split(' ');

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.trackId,
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