const express = require('express');
const { openAccount } = require('../controllers/account.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/open', verifyToken, openAccount);

module.exports = router;
