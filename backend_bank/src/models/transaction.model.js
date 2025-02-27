const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./account.model');

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  accountNumber: {  // เปลี่ยนจาก accountId เป็น accountNumber
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Account, key: 'accountNumber' }  // เปลี่ยนจาก 'id' เป็น 'accountNumber'
  },
  type: { 
    type: DataTypes.ENUM('deposit', 'withdraw', 'transfer'), 
    allowNull: false 
  },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  recipientAccountId: { 
    type: DataTypes.UUID, 
    allowNull: true // ใช้กรณีโอนเงินเท่านั้น
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

Account.hasMany(Transaction, { foreignKey: 'accountNumber' });  // เปลี่ยนจาก 'accountId' เป็น 'accountNumber'
Transaction.belongsTo(Account, { foreignKey: 'accountNumber' }); // เปลี่ยนจาก 'accountId' เป็น 'accountNumber'

module.exports = Transaction;
