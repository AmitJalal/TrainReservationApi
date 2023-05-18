require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const connectDB = require('./db/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

const PORT = process.env.PORT || 5000;

// routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Success, WELCOME to TrainBooking Api',
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`App is running at PORT: ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
