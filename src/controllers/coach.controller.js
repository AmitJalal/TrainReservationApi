const { Coach } = require('../models');

const initializeCoach = async (req, res) => {
  const {
    coach_number,
    coach_type,
    coach_designation,
    caoch_seats,
    total_seats,
  } = req.body;

  try {
    const newCoach = new Coach({
      coach_number,
      coach_type,
      coach_designation,
      caoch_seats,
      total_seats,
    });
    await newCoach.save();

    // Call the createSeats method to create 80 seats for the coach
    await newCoach.createSeats(coach_type, coach_designation);

    res.status(200).json({
      msg: `${coach_type} Caoch with ${total_seats} seats created successfully!!`,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { initializeCoach };
