import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Kết nối mongodb thành công');
  } catch (error) {
    console.log('Kết nối mongodb thất bại');
    console.error(error);
  }
};

export default connectDb;
