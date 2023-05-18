const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true,
  },
  coach_type: {
    type: String,
    required: true,
  },
  coach_designation: {
    type: String,
    required: true,
  },
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
