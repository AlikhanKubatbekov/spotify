import { model, Schema, Types } from 'mongoose';
import Album from './Album';
import {ITrack} from '../types/track';

const TrackSchema = new Schema<ITrack>(
  {
    trackNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    trackName: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: 'Album',
      required: true,
      validate: {
        validator: async (albumId: Types.ObjectId) => Album.findById(albumId),
        message: 'Album does not exist',
      },
    },
    trackDuration: {
      type: String,
      required: true,
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

const Track = model('Track', TrackSchema);

export default Track;
