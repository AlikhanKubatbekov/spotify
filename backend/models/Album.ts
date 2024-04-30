import {Schema, model, Types} from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (artistId: Types.ObjectId) => Artist.findById(artistId),
      message: 'Artist does not exist',
    }
  },
  publicDate: {
    type: Number,
    required: true,
  },
  albumImage: {
    type: String || null,
    trim: true
  }
}, {
  versionKey: false,
});

const Album = model('Album', AlbumSchema);

export default Album;