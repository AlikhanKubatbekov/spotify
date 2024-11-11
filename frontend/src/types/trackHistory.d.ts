import { User } from './user';
import { Track } from './track';
import { Artist } from './artist';

export interface TrackListenedTo {
  _id: string;
  user: User;
  track: Track;
  artist: Artist;
  datetime: Date;
}
