import express, {Request, Response, NextFunction} from 'express';
import {Error, mongo} from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
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

usersRouter.post('/sessions', async (req: Request, res: Response, next: NextFunction) => {
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

usersRouter.delete('/sessions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerValue = req.get('Authorization');
    const success = {message: 'Successfully logout!'};

    if (!headerValue) return res.send(success);

    const [, token] = headerValue.split(' ');

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;