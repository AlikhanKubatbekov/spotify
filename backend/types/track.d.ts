import { Schema } from 'mongoose';

export interface ITrack extends Document {
  trackNumber: number;
  trackName: string;
  album: Schema.ObjectId;
  trackDuration: string;
  isPublished: boolean;
}

export interface ITrackMutation {
  trackNumber: string;
  trackName: string;
  album: string;
  trackDuration: string;
}
