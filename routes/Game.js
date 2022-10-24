const express = require('express');
const gamesController = require('../app/Controllers/GameController');

const router = express.Router();

router.post('/create', gamesController.create);
router.post('/join', gamesController.join);
router.post('/invite', gamesController.invite);
router.post('/accept', gamesController.accept);

module.exports = router;
