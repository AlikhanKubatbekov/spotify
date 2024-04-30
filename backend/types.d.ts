import {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
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
