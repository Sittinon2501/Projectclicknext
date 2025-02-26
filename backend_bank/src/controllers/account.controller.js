const Account = require('../models/account.model');

function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // สุ่มเลขบัญชี 10 หลัก
}

exports.openAccount = async (req, res) => {
  try {
    const { accountName, accountType, initialDeposit, fixedTermMonths } = req.body;
    const userId = req.user.userId;

    if (!accountName) {
      return res.status(400).json({ message: 'Account name is required' });
    }

    if (!['savings', 'fixed_deposit'].includes(accountType)) {
      return res.status(400).json({ message: 'Invalid account type' });
    }

    let interestRate;
    if (accountType === 'savings') {
      interestRate = 0.5; // 0.5% ต่อปี
    } else if (accountType === 'fixed_deposit') {
      // ✅ ตรวจสอบให้แน่ใจว่า fixedTermMonths เป็นตัวเลข
      const term = Number(fixedTermMonths);
      const allowedTerms = [3, 6, 12];

      if (!allowedTerms.includes(term)) {
        return res.status(400).json({ message: 'Fixed deposit term must be 3, 6, or 12 months' });
      }

      // ✅ กำหนดดอกเบี้ยตามระยะเวลาฝาก
      const interestRates = { 3: 1.5, 6: 1.7, 12: 2.0 };
      interestRate = interestRates[term];
    }

    const accountNumber = generateAccountNumber();

    const account = await Account.create({
      userId,
      accountNumber,
      accountName,
      accountType,
      balance: initialDeposit,
      interestRate,
      fixedTermMonths: accountType === 'fixed_deposit' ? Number(fixedTermMonths) : null
    });

    res.status(201).json({ message: 'Bank account opened successfully', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
