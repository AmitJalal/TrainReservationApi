const mongoose = require('mongoose');

const connectDB = async (MONGO_URL) => {
  await mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`DB connected`);
    })
    .catch((err) => {
      console.log('MongoDB connection error: ', err);
    });
};

module.exports = connectDB;
