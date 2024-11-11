import { Album } from './album';

export interface Track {
  _id: string;
  trackNumber: number;
  trackName: string;
  album: Album;
  trackDuration: string;
}
