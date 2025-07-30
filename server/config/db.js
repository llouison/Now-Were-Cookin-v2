import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🗄️  MongoDB connected!`);
  } catch (err) {
    console.log(err);
    //app will shut down if err
    process.exit(1);
  }
};
