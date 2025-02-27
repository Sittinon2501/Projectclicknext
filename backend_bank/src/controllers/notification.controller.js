const Notification = require("../models/notification.model"); // นำเข้า Notification model

// ฟังก์ชันดึงการแจ้งเตือนทั้งหมด
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId; // ดึง userId จาก token

    // ค้นหาการแจ้งเตือนทั้งหมดของผู้ใช้
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']], // จัดเรียงจากการแจ้งเตือนล่าสุด
    });

    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ฟังก์ชันทำเครื่องหมายว่าอ่านการแจ้งเตือน
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // ค้นหาการแจ้งเตือนจาก id
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // อัพเดตสถานะการอ่าน
    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ฟังก์ชันลบการแจ้งเตือน
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // ค้นหาการแจ้งเตือนจาก id
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // ลบการแจ้งเตือน
    await notification.destroy();

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
