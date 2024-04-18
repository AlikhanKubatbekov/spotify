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

    user.generateToken();

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

usersRouter.post('/sessions', async (req: Request, res: Response, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
      return res.status(400).send({error: 'Username or password is wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Username or password is wrong!'});
    }

    user.generateToken();

    await user.save();

    return res.send({message: 'Username and password correct!', user});
  } catch (e) {
    next(e);
  }
});

export default usersRouter;