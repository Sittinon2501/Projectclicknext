const express = require('express');
const {
  deposit,
  withdraw,
  transfer,
  viewBalance,
  transactionHistory
} = require('../controllers/transaction.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/deposit', verifyToken, deposit);
router.post('/withdraw', verifyToken, withdraw);
router.post('/transfer', verifyToken, transfer);
router.get('/balance', verifyToken, viewBalance);
router.get('/history', verifyToken, transactionHistory);

module.exports = router;
