const express = require('express');
const router = express.Router();
const { createProof } = require('../controllers/proofController');

router.post('/', createProof);

module.exports = router;
