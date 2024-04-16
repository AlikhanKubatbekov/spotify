import {Schema, model, Types} from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  albumImage: String || null
}, {
  versionKey: false,
});

const Album = model('Album', AlbumSchema);

export default Album;