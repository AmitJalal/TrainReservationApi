const BookingRouter = require('./booking.router');
const CoachRouter = require('./coach.Router');

const router = require("express").Router()

router.use('/initializeCoach', CoachRouter);
router.use('/seat', BookingRouter);


module.exports = router;
