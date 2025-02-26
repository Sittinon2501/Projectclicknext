const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./account.model');

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  accountId: { 
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Account, key: 'id' }
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

Account.hasMany(Transaction, { foreignKey: 'accountId' });
Transaction.belongsTo(Account, { foreignKey: 'accountId' });

module.exports = Transaction;
