import {Schema, model} from 'mongoose';

const TrackSchema = new Schema({
  trackName: {
    type: String,
    required: true,
  },
  trackDuration: {
    type: String,
    required: true,
  }
});

const Track = model('Track', TrackSchema);

export default Track;