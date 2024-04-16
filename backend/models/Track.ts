import {model, Schema, Types} from 'mongoose';
import Album from './Album';

const TrackSchema = new Schema({
  trackName: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (albumId: Types.ObjectId) => Album.findById(albumId),
      message: 'Album does not exist',
    }
  },
  trackDuration: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
});

const Track = model('Track', TrackSchema);

export default Track;