import {Schema, model} from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String || null,
    trim: true
  },
  information: {
    type: String,
    trim: true
  }
}, {
  versionKey: false,
});

const Artist = model('Artist', ArtistSchema);

export default Artist;