import {model, Schema} from 'mongoose';
import {UserFields} from '../types';

const userSchema = new Schema<UserFields>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
});

const User = model('User', userSchema);

export default User;