const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");

const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      unique: true, // ทำให้ผู้ใช้สามารถมีได้แค่ 1 บัญชี
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.ENUM("savings"), // ลบ "fixed_deposit" ออก
      allowNull: false,
    },
    balance: { type: DataTypes.FLOAT, defaultValue: 0.0 },
    interestRate: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false }
);

User.hasOne(Account, { foreignKey: "userId" }); // ใช้ hasOne แทน hasMany
Account.belongsTo(User, { foreignKey: "userId" });

module.exports = Account;
