import { Model, Schema } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface ArtistMutation {
  name: string;
  photo: string | null;
  information: string | null;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  publicDate: string;
  albumImage: string | null;
}

export interface TrackMutation {
  trackNumber: string;
  trackName: string;
  album: string;
  trackDuration: string;
}

export interface Album extends Document {
  title: string;
  artist: Schema.ObjectId;
  publicDate: number;
  albumImage: string | null;
  isPublished: boolean;
}

export interface Artist extends Document {
  name: string;
  photo: string | null;
  information: string | null;
  isPublished: boolean;
}

export interface Track extends Document {
  trackNumber: number;
  trackName: string;
  album: Schema.ObjectId;
  trackDuration: string;
  isPublished: boolean;
}

export interface TrackHistory extends Document {
  _id: Schema.ObjectId;
  user: Schema.ObjectId;
  track: Schema.ObjectId;
  artist: Schema.ObjectId;
  datetime: Date;
}
