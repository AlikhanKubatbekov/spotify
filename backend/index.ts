import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';
import usersRouter from './routers/users';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
