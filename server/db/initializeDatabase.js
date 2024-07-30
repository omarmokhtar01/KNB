// db/initializeDatabase.js
const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models/userModel');
require('dotenv').config();

const initializeDatabase = async () => {
  const dbName = process.env.DB_NAME;

  // Function to create the database if it doesn't exist
  const createDatabase = async () => {
    const tempSequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`);
    try {
      await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
      console.log(`Database ${dbName} created or already exists.`);
    } catch (error) {
      console.error("Error creating database:", error);
    } finally {
      await tempSequelize.close();
    }
  };

  // Function to seed user data if it doesn't already exist
  const seedData = async () => {
    const users = await User.findAll();
    if (users.length === 0) {
      await User.bulkCreate([
        {
          email: process.env.ADMIN_EMAIL,
          password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: process.env.SUBADMIN_EMAIL,
          password: await bcrypt.hash(process.env.SUBADMIN_PASSWORD, 10),
          role: "subAdmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: process.env.USER_EMAIL,
          password: await bcrypt.hash(process.env.USER_PASSWORD, 10),
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Seed data inserted!");
    } else {
      console.log("Seed data already exists.");
    }
  };

  // Create the database and sync models
  await createDatabase();
  await sequelize.authenticate();
  console.log("Database connected!");
  await sequelize.sync({ alter: true });
  await seedData();
};

module.exports = initializeDatabase;
