const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model');

const Account = sequelize.define('Account', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { 
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  accountNumber: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  accountName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  accountType: { 
    type: DataTypes.ENUM('savings', 'fixed_deposit'), 
    allowNull: false 
  },
  balance: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  interestRate: { type: DataTypes.FLOAT, allowNull: false },
  fixedTermMonths: { type: DataTypes.INTEGER, allowNull: true }, // ใช้เฉพาะ Fixed Deposit
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

User.hasMany(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

module.exports = Account;
