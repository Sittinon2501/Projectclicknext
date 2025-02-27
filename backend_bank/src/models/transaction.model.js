const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./account.model');

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  accountNumber: {  
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Account, key: 'accountNumber' }
  },
  type: { 
    type: DataTypes.ENUM('deposit', 'withdraw', 'transfer out', 'transfer in'), 
    allowNull: false 
  },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  recipientAccountId: { 
    type: DataTypes.STRING, 
    allowNull: true // ใช้กรณีโอนเงินเท่านั้น
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

Account.hasMany(Transaction, { foreignKey: 'accountNumber' });
Transaction.belongsTo(Account, { foreignKey: 'accountNumber' });

module.exports = Transaction;
