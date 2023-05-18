const { initializeCoach } = require('../../controllers');

const CoachRouter = require('express').Router();

CoachRouter.post('/', initializeCoach);

module.exports = CoachRouter;
