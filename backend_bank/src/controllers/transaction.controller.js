const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");

exports.deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    if (amount <= 0)
      return res
        .status(400)
        .json({ message: "Deposit amount must be greater than 0" });

    // ค้นหาบัญชีจาก accountNumber
    const account = await Account.findOne({ where: { accountNumber } });
    if (!account) return res.status(404).json({ message: "Account not found" });

    account.balance += amount;
    await account.save();

    await Transaction.create({ accountNumber, type: "deposit", amount });

    res.json({ message: "Deposit successful", balance: account.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    if (amount <= 0)
      return res
        .status(400)
        .json({ message: "Withdraw amount must be greater than 0" });

    const account = await Account.findOne({ where: { accountNumber } });
    if (!account) return res.status(404).json({ message: "Account not found" });

    if (account.balance < amount)
      return res.status(400).json({ message: "Insufficient funds" });

    account.balance -= amount;
    await account.save();

    await Transaction.create({ accountNumber, type: "withdraw", amount });

    res.json({ message: "Withdraw successful", balance: account.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
exports.transfer = async (req, res) => {
  try {
    const { recipientAccountNumber, amount } = req.body;

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Transfer amount must be greater than 0" });
    }

    // ค้นหาบัญชีของผู้ส่งจาก userId ใน Token
    const senderAccount = await Account.findOne({
      where: { userId: req.user.userId },
    });
    if (!senderAccount) {
      return res.status(404).json({ message: "Sender account not found" });
    }

    // ค้นหาบัญชีผู้รับจากเลขบัญชีที่ป้อนมา
    const recipientAccount = await Account.findOne({
      where: { accountNumber: recipientAccountNumber },
    });

    if (!recipientAccount) {
      return res.status(404).json({ message: "Recipient account not found" });
    }

    if (senderAccount.id === recipientAccount.id) {
      return res
        .status(400)
        .json({ message: "Cannot transfer to your own account" });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // หักเงินจากบัญชีผู้ส่ง และเพิ่มเงินให้บัญชีผู้รับ
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save();
    await recipientAccount.save();

    // บันทึกธุรกรรมของผู้ส่ง (transfer out)
    await Transaction.create({
      accountNumber: senderAccount.accountNumber, // เปลี่ยนจาก accountId เป็น accountNumber
      type: "transfer out", // เปลี่ยนเป็น 'transfer out'
      amount,
      recipientAccountId: recipientAccount.accountNumber, // เปลี่ยนจาก accountId เป็น accountNumber
    });

    // บันทึกธุรกรรมของผู้รับ (transfer in)
    await Transaction.create({
      accountNumber: recipientAccount.accountNumber, // เปลี่ยนจาก accountId เป็น accountNumber
      type: "transfer in", // เปลี่ยนเป็น 'transfer in'
      amount, // บันทึกยอดที่เพิ่มเข้ามา
    });

    res.json({
      message: "Transfer successful",
      sender: {
        accountNumber: senderAccount.accountNumber,
        balance: senderAccount.balance,
      },
      recipient: {
        accountNumber: recipientAccount.accountNumber,
        balance: recipientAccount.balance,
      },
    });
  } catch (error) {
    console.error(error); // เพิ่มการตรวจสอบข้อผิดพลาดในฝั่งเซิร์ฟเวอร์
    res.status(500).json({ error: error.message });
  }
};

exports.viewBalance = async (req, res) => {
  try {
    // ดึง userId จาก Token
    const userId = req.user.userId;

    // ค้นหาบัญชีของผู้ใช้
    const account = await Account.findOne({ where: { userId } });
    if (!account) {
      return res
        .status(404)
        .json({ message: "No account found for this user" });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transactionHistory = async (req, res) => {
  try {
    // ดึง userId จาก Token
    const userId = req.user.userId;

    // ค้นหาบัญชีของผู้ใช้
    const account = await Account.findOne({ where: { userId } });
    if (!account) {
      return res
        .status(404)
        .json({ message: "No account found for this user" });
    }

    // ค้นหาประวัติธุรกรรมของบัญชีนี้โดยใช้ accountNumber แทน accountId
    const transactions = await Transaction.findAll({
      where: { accountNumber: account.accountNumber }, // เปลี่ยนจาก accountId เป็น accountNumber
      order: [["createdAt", "DESC"]],
    });

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
