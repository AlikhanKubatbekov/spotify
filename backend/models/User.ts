import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import {UserFields} from '../types';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields>({
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  }
});

const User = model('User', UserSchema);

export default User;