const express = require('express');
const router = express.Router();
const { sendEmergency } = require('../controllers/emergencyController');

router.post('/', sendEmergency);

module.exports = router;
