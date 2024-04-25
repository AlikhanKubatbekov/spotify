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
