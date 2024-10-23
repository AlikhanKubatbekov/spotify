import { Schema, model, Types } from 'mongoose';
import Artist from './Artist';
import { Album } from '../types';

const AlbumSchema = new Schema<Album>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      validate: {
        validator: async (artistId: Types.ObjectId) => Artist.findById(artistId),
        message: 'Artist does not exist',
      },
    },
    publicDate: {
      type: Number,
      required: true,
    },
    albumImage: {
      type: String || null,
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

const Album = model('Album', AlbumSchema);

export default Album;
