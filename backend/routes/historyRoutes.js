const express = require('express');
const router = express.Router();
const { addHistory, listHistory } = require('../controllers/historyController');

router.post('/', addHistory);
router.get('/', listHistory);

module.exports = router;
