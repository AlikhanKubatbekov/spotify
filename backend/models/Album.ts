import {Schema, model} from "mongoose";

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  publicDate: {
    type: String,
    required: true,
  },
  albumImage: String || null
});

const Album = model('Album', AlbumSchema);

export default Album;