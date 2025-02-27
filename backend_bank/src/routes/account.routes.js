const express = require("express");
const {
  getUserAccounts,
} = require("../controllers/account.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/user", verifyToken, getUserAccounts);

module.exports = router;
