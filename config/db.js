import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/extractMetadata', () => {
      console.log('Connected to database...');
    });
  } catch (error) {
    console.log('Unable to connect to db', error);
  }
};

export { connectDatabase };
