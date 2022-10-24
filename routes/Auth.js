const express = require('express');
const authController = require('../app/Controllers/AuthController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/update-rating-status', authController.updateRatingStatus);
router.post('/update-rating-last-shown', authController.updateRatingLastShown);

module.exports = router;