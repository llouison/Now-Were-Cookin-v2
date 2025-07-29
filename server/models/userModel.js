import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    next();
  } catch (err) {
    console.log(`An error has occurred: ${err}`);
  }
});

userSchema.methods.comparePasswords = async function (submittedPassword) {
  return await bcrypt.compare(submittedPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
