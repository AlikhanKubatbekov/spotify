import { Schema } from 'mongoose';

export interface ITrackHistory extends Document {
  _id: Schema.ObjectId;
  user: Schema.ObjectId;
  track: Schema.ObjectId;
  artist: Schema.ObjectId;
  datetime: Date;
}
