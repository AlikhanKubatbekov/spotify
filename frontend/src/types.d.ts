export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Artist {
  _id: string;
  name: string;
  photo: string | null,
  information: string | null
}

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  publicDate: number;
  albumImage: string | null;
}

export interface Track {
  _id: string;
  trackNumber: number;
  trackName: string;
  album: Album;
  trackDuration: string;
}

export interface TrackListenedTo {
  _id: string;
  user: User;
  track: Track;
  datetime: Date;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
