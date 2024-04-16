import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
