const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notification.controller"); // นำเข้าฟังก์ชันจาก controller
const { verifyToken } = require("../middleware/auth.middleware");

// Route สำหรับดึงการแจ้งเตือนทั้งหมด
router.get("/", verifyToken, getNotifications);
// Route สำหรับทำเครื่องหมายว่าอ่านการแจ้งเตือนแล้ว
router.put("/:id/read", verifyToken, markAsRead);

// Route สำหรับลบการแจ้งเตือน
router.delete("/:id", verifyToken, deleteNotification);
module.exports = router;
