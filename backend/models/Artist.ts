import { Schema, model } from 'mongoose';
import { Artist } from '../types';

const ArtistSchema = new Schema<Artist>(
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
