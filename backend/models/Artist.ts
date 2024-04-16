import {Schema, model} from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: String || null,
  information: String
}, {
  versionKey: false,
});

const Artist = model('Artist', ArtistSchema);

export default Artist;