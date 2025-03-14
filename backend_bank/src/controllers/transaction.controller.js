const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");
const Notification = require("../models/notification.model"); // นำเข้า Notification model

// ฟังก์ชันสำหรับ Deposit
exports.deposit = async (req, res) => {
  try {
    const { accountNumber, amount, description } = req.body;

    const senderAccount = await Account.findOne({ where: { accountNumber } });
    if (!senderAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    senderAccount.balance += amount;
    await senderAccount.save();

    // บันทึกธุรกรรม Deposit
    await Transaction.create({
      accountNumber,
      type: "deposit",
      amount,
      description: description || "Deposit transaction", // ถ้าไม่มี description, ใช้ค่าเริ่มต้น
    });

    res.json({ message: "Deposit successful", balance: senderAccount.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ฟังก์ชันสำหรับ Withdraw
exports.withdraw = async (req, res) => {
  try {
    const { accountNumber, amount, description } = req.body;

    const senderAccount = await Account.findOne({ where: { accountNumber } });
    if (!senderAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    senderAccount.balance -= amount;
    await senderAccount.save();

    // บันทึกธุรกรรม Withdraw
    await Transaction.create({
      accountNumber,
      type: "withdraw",
      amount,
      description: description || "Withdraw transaction", // ถ้าไม่มี description, ใช้ค่าเริ่มต้น
    });

    res.json({
      message: "Withdraw successful",
      balance: senderAccount.balance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { recipientAccountNumber, amount, description } = req.body; // รับค่า description

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Transfer amount must be greater than 0" });
    }

    // ค้นหาบัญชีของผู้โอนจาก userId ใน Token
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

    // หักเงินจากบัญชีผู้โอน และเพิ่มเงินให้บัญชีผู้รับ
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save();
    await recipientAccount.save();

    // บันทึกธุรกรรมของผู้โอน (transfer out) พร้อมคำอธิบาย
    await Transaction.create({
      accountNumber: senderAccount.accountNumber,
      type: "transfer out", // กำหนดเป็น 'transfer out'
      amount,
      recipientAccountId: recipientAccount.accountNumber,
      description: description || "Transfer to another account", // ใช้คำอธิบายที่ส่งมา
    });

    // บันทึกธุรกรรมของผู้รับ (transfer in) พร้อมคำอธิบาย และเพิ่ม recipientAccountId
    await Transaction.create({
      accountNumber: recipientAccount.accountNumber,
      type: "transfer in", // กำหนดเป็น 'transfer in'
      amount,
      recipientAccountId: senderAccount.accountNumber, // เพิ่ม recipientAccountId ของผู้โอน
      description: description || "Transfer from another account", // ใช้คำอธิบายที่ส่งมา
    });

    // สร้างการแจ้งเตือนให้กับผู้รับ
    const notificationMessage = `You have received a transfer of ${amount} from account ${
      senderAccount.accountNumber
    }. Description: ${description || "No description"}`;
    await Notification.create({
      userId: recipientAccount.userId, // userId ของผู้รับการแจ้งเตือน
      message: notificationMessage, // ข้อความการแจ้งเตือน
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
    console.error(error);
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
    const userId = req.user.userId;

    // ค้นหาบัญชีของผู้ใช้
    const account = await Account.findOne({ where: { userId } });
    if (!account) {
      return res.status(404).json({ message: "No account found for this user" });
    }

    // ค้นหาประวัติธุรกรรมของบัญชีนี้
    const transactions = await Transaction.findAll({
      where: { accountNumber: account.accountNumber },
      order: [["createdAt", "DESC"]],
    });

    // สร้างข้อมูลธุรกรรมที่ต้องการส่งกลับ
    const transactionDetails = await Promise.all(
      transactions.map(async (transaction) => {
        // ดึงข้อมูลบัญชีผู้โอน
        const senderAccount = await Account.findOne({
          where: { accountNumber: transaction.accountNumber },
        });

        // ดึงข้อมูลบัญชีผู้รับ (ถ้ามี recipientAccountId)
        const recipientAccount = transaction.recipientAccountId
          ? await Account.findOne({
              where: { accountNumber: transaction.recipientAccountId },
            })
          : null;

        let senderInfo = {
          senderAccountNumber: senderAccount ? senderAccount.accountNumber : "N/A",
          senderAccountName: senderAccount ? senderAccount.accountName : "N/A",
        };

        let recipientInfo = {
          recipientAccountNumber: recipientAccount ? recipientAccount.accountNumber : null,
          recipientAccountName: recipientAccount ? recipientAccount.accountName : null,
        };

        // ถ้าเป็นประเภท 'transfer in' ให้สลับข้อมูล sender และ recipient
        if (transaction.type === "transfer in") {
          return {
            ...transaction.dataValues,
            senderAccountNumber: recipientInfo.recipientAccountNumber || "N/A",
            senderAccountName: recipientInfo.recipientAccountName || "N/A",
            recipientAccountNumber: senderInfo.senderAccountNumber || "N/A",
            recipientAccountName: senderInfo.senderAccountName || "N/A",
            description: transaction.description || "No description",
          };
        }

        // ถ้าไม่ใช่ 'transfer in' แสดงข้อมูลตามปกติ
        return {
          ...transaction.dataValues,
          senderAccountNumber: senderInfo.senderAccountNumber,
          senderAccountName: senderInfo.senderAccountName,
          recipientAccountNumber: recipientInfo.recipientAccountNumber,
          recipientAccountName: recipientInfo.recipientAccountName,
          description: transaction.description || "No description",
        };
      })
    );

    res.Json({ transactions: transactionDetails }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
