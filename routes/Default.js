const express = require('express');
const authController = require('../app/Controllers/DefaultController');

const router = express.Router();

router.get('/', authController.index);

module.exports = router;
