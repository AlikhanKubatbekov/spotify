import { HydratedDocument, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { IUserFields, IUserMethods, UserModel } from '../types/user';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<IUserFields, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (this: HydratedDocument<IUserFields>, email: string): Promise<boolean> {
          if (!this.isModified('email')) return true;

          const user: HydratedDocument<IUserFields> | null = await User.findOne({ email });
          return !Boolean(user);
        },
        message: 'This user is already registered!',
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    displayName: {
      required: true,
      type: String,
      trim: true,
    },
    googleId: String,
    avatar: String || null,
  },
  {
    versionKey: false,
  },
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

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
  },
});

const User = model<IUserFields, UserModel>('User', UserSchema);

export default User;
