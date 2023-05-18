const mongoose = require('mongoose');
const Seat = require('./Seat');

const coachSchema = new mongoose.Schema({
  coach_number: {
    type: Number,
    required: true,
    unique: true,
  },
  coach_type: {
    type: String,
    required: true,
  },
  coach_designation: {
    type: String,
    required: true,
  },
  caoch_seats: {
    type: String,
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
    },
  ],
});

// Create 80 seats for a new coach
coachSchema.methods.createSeats = async function (
  coach_type,
  coach_designation
) {
  const seats = [];

  const numRows = 12; // Total number of rows in the coach
  const seatsPerRow = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3]; // Seats per row in each row group

  let seatNumber = 1;

  for (let row = 0; row < numRows; row++) {
    const rowSeats = seatsPerRow[row];

    for (let seat = 0; seat < rowSeats; seat++) {
      const seatData = {
        seatNumber,
        coach_type,
        coach_designation,
        coach: this._id,
      };

      const newSeat = new Seat(seatData);
      await newSeat.save();
      seats.push(newSeat);

      seatNumber++;
    }
  }

  this.seats = seats;
  await this.save();
};

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
