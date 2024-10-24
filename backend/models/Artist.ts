import { Schema, model } from 'mongoose';
import { IArtist } from '../types/artist';

const ArtistSchema = new Schema<IArtist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String || null,
      trim: true,
    },
    information: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

const Artist = model('Artist', ArtistSchema);

export default Artist;
