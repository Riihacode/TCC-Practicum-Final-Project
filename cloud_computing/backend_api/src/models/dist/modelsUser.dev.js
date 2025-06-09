"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _database = require("../configDatabase/database.js");

var DataTypes = _sequelize.Sequelize.DataTypes;

var User = _database.db.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
    unique: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_pic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  refresh_token: {
    // Tambahkan ini di database sql
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "users",
  timestamps: false
});

_database.db.sync().then(function () {
  return console.log("Database Synchronized");
});

var _default = User;
exports["default"] = _default;