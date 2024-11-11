import { Artist } from './artist';

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  publicDate: number;
  albumImage: string | null;
}
