const express = require('express');
const router = express.Router();
const { createExcuse } = require('../controllers/excuseController');

router.post('/', createExcuse);

module.exports = router;
