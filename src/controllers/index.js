const {
  bookSeats,
  getAvailableSeats,
  getAllSeats,
} = require('./booking.controller');
const { initializeCoach } = require('./coach.controller');
module.exports = { initializeCoach, bookSeats, getAvailableSeats, getAllSeats };
