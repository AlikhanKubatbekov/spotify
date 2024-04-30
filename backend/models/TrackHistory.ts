import {Schema, model, Types} from 'mongoose';
import User from './User';
import Track from './Track';

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (userId: Types.ObjectId) => User.findById(userId),
      message: 'User does not exist'
    },
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (trackId: Types.ObjectId) => Track.findById(trackId),
      message: 'Track does not exist'
    }
  },
  datetime: {
    type: Date,
    required: true,
  }
}, {
  versionKey: false,
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
