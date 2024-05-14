export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginMutation {
  email: string;
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
  artist: Artist;
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
