const { Coach } = require('../models');

const getAllSeats = async (req, res) => {
  // get all seats
  try {
    const coach = await Coach.find({}).populate('seats');
    // console.log('-->getAllSeats', coach);
    res
      .status(200)
      .json({
        total_coach: coach.length,
        total_seats: coach.length * 80,
        coach,
      });
  } catch (error) {
    console.log('-->getAllSeats', error);
    res.status(500).json({ Error: error.message });
  }
};

const getAvailableSeats = async (req, res) => {
  const { coach_type } = req.body;

  const coach_seat = {};

  if (coach_type) {
    coach_seat.coach_type = coach_type;
  }

  // Find  available seats
  try {
    const coach = await Coach.findOne(coach_seat).populate('seats');
    const availableSeats = coach.seats.filter((seat) => !seat.isReserved);
    // console.log('-->getAvailableSeats', availableSeats);
    res.status(200).json({
      coach_type,
      remaining_seats: availableSeats.length,
      total_seats: coach.seats.length,
      availableSeats,
    });
  } catch (error) {
    console.log('-->getAvailableSeats', error);
    res.status(500).json({ Error: error });
  }
};

const bookSeats = async (req, res, next) => {
  const seatsToBeBooked = req.body.totalSeats;
  const coach_type = req.body.coach_type;
  // console.log(seatsToBeBooked);

  // Check if the requested number of seats is valid
  if (seatsToBeBooked < 1 || seatsToBeBooked > 7) {
    return res.status(400).json({
      error: 'Invalid number of seats. Please select between 1 and 7 seats.',
    });
  }

  try {
    // Find  available seats
    const coach = await Coach.findOne({ coach_type }).populate('seats');
    console.log(coach)
    const availableSeats = coach.seats.filter((seat) => !seat.isReserved);
    // console.log(availableSeats.length);
    let seatsCanBeBooked = availableSeats.length;

    if (seatsCanBeBooked == 0)
      return res
        .status(200)
        .json('We are Really sorry, all seats are booked already!!');

    // Check if the requested number of seats is available
    if (seatsCanBeBooked < seatsToBeBooked) {
      return res.status(400).json({
        msg: `Total seats left are ${seatsCanBeBooked}, please  book number of seats accordingly`,
      });
    }

    // Try to find consecutive seats
    let reservedSeats = [];
    for (let i = 0; i < seatsCanBeBooked; i++) {
      if (i === seatsCanBeBooked - 1) {
        reservedSeats = availableSeats.slice(i - (seatsToBeBooked - 1), i + 1);
        break;
      }

      const currentSeat = availableSeats[i];
      const nextSeat = availableSeats[i + 1];

      if (nextSeat.seatNumber - currentSeat.seatNumber === 1) {
        if (
          nextSeat.seatNumber - currentSeat.seatNumber ===
          seatsToBeBooked - 1
        ) {
          reservedSeats = availableSeats.slice(
            i - (seatsToBeBooked - 2),
            i + 2
          );
          break;
        }
      } else {
        reservedSeats = availableSeats.slice(i - (seatsToBeBooked - 1), i + 1);
        break;
      }
    }

    // Update the reserved status of the seats
    for (const seat of reservedSeats) {
      seat.isReserved = true;
      await seat.save();
    }

    const responseSeats = reservedSeats.map((seat) => ({
      id: seat._id,
      seatNumber: seat.seatNumber,
    }));

    return res.status(200).json({
      message: 'Seats booked successfully.',
      seats: responseSeats,
      totalSeatsLeft: seatsCanBeBooked - seatsToBeBooked,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again later.' });
  }
};

module.exports = {
  getAllSeats,
  getAvailableSeats,
  bookSeats,
};
