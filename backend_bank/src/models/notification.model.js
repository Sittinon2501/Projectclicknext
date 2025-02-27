const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./account.model'); // เพื่อเชื่อมโยงกับบัญชีผู้รับ

const Notification = sequelize.define('Notification', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  userId: { 
    type: DataTypes.UUID, 
    allowNull: false,
    references: { model: Account, key: 'userId' }, // เชื่อมโยงกับบัญชีผู้รับ
  },
  message: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  isRead: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  createdAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
});

module.exports = Notification;
