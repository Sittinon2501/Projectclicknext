const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { openAccount } = require('../controllers/account.controller'); // เพิ่มการเรียกใช้ฟังก์ชัน openAccount

exports.register = async (req, res) => {
  try {
    const { username, password, accountName, accountType, initialDeposit } = req.body; // ลบ fixedTermMonths ออก

    // เช็คว่ามี username นี้อยู่แล้วหรือไม่
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    // เปิดบัญชีให้ผู้ใช้หลังจากสมัครสมาชิกเสร็จ
    const accountData = { accountName, accountType, initialDeposit, userId: user.id };
    const accountResponse = await openAccount(req, res, accountData); // เปิดบัญชีในฟังก์ชันนี้

    res.status(201).json({
      message: 'User registered and account opened successfully',
      userId: user.id,
      account: accountResponse.account,  // ข้อมูลบัญชี
      annualInterest: accountResponse.annualInterest // ข้อมูลดอกเบี้ย
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    // เช็คว่า username และ password ถูกต้องหรือไม่
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // สร้าง JWT Token
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
