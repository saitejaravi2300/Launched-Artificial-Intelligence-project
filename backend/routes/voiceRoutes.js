const express = require('express');
const router = express.Router();
const { createVoice } = require('../controllers/voiceController');

router.post('/', createVoice);

module.exports = router;
