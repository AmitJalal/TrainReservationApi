const { bookSeats, getAvailableSeats, getAllSeats } = require('../../controllers');

const BookingRouter = require('express').Router();

BookingRouter.post('/book', bookSeats);
BookingRouter.get('/available', getAvailableSeats);
BookingRouter.get('/all', getAllSeats);

module.exports = BookingRouter;
