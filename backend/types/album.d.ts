import { Schema } from 'mongoose';

export interface IAlbum extends Document {
  title: string;
  artist: Schema.ObjectId;
  publicDate: number;
  albumImage: string | null;
  isPublished: boolean;
}

export interface IAlbumMutation {
  title: string;
  artist: string;
  publicDate: string;
  albumImage: string | null;
}
