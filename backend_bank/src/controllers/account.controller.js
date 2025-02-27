const Account = require('../models/account.model');

// ฟังก์ชันสำหรับการสุ่มเลขบัญชี
function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // สุ่มเลขบัญชี 10 หลัก
}

// ฟังก์ชันคำนวณดอกเบี้ยประจำปี
function calculateAnnualInterest(account) {
  return (account.balance * account.interestRate) / 100;
}

// เปิดบัญชีใหม่
exports.openAccount = async (req, res, accountData) => {
  try {
    const { accountName, accountType, initialDeposit, userId } = accountData; // ลบ fixedTermMonths ออก

    // ตรวจสอบว่า Account Name ถูกต้อง
    if (!accountName) {
      return res.status(400).json({ message: 'Account name is required' });
    }

    // ตรวจสอบประเภทบัญชี
    if (!['savings'].includes(accountType)) {  // ลบ "fixed_deposit" ออกไป
      return res.status(400).json({ message: 'Invalid account type' });
    }

    let interestRate;
    // กำหนดอัตราดอกเบี้ย
    if (accountType === 'savings') {
      interestRate = 0.5; // 0.5% ต่อปี
    }

    // สร้างเลขบัญชี
    const accountNumber = generateAccountNumber();

    // สร้างบัญชีใหม่ในฐานข้อมูล
    const account = await Account.create({
      userId,
      accountNumber,
      accountName,
      accountType,
      balance: initialDeposit,
      interestRate,
      fixedTermMonths: null // ลบ fixedTermMonths ออกไปในกรณีของบัญชี "savings"
    });

    // คำนวณดอกเบี้ยที่ผู้ใช้จะได้รับในแต่ละปี
    const annualInterest = calculateAnnualInterest(account);

    return { account, annualInterest }; // คืนค่าบัญชีและดอกเบี้ย
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// เพิ่ม API สำหรับดึงข้อมูลบัญชีของผู้ใช้
exports.getUserAccounts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const accounts = await Account.findAll({ where: { userId } });

    // คำนวณดอกเบี้ยที่ผู้ใช้จะได้รับในแต่ละบัญชี
    const accountsWithInterest = accounts.map(account => {
      const annualInterest = calculateAnnualInterest(account);
      return {
        ...account.toJSON(),
        annualInterest,
      };
    });

    res.json({ accounts: accountsWithInterest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
