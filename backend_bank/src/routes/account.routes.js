const express = require("express");
const {
  openAccount,
  getUserAccounts,
} = require("../controllers/account.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/open", verifyToken, openAccount);
router.get("/user", verifyToken, getUserAccounts);

module.exports = router;
