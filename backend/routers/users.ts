import express, {Request, Response} from 'express';
import {Error, mongo} from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req: Request, res: Response, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({error: 'Username and password are required!'});
  }

  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongo.MongoServerError && e.code === 11000) {
      return res.status(422).send({message: 'Username should be unique!'});
    }

    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default usersRouter;