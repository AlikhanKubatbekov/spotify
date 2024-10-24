export interface IArtist extends Document {
  name: string;
  photo: string | null;
  information: string | null;
  isPublished: boolean;
}

export interface IArtistMutation {
  name: string;
  photo: string | null;
  information: string | null;
}
