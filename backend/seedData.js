const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/database');
const User = require('./models/User');
const Farm = require('./models/Farm');
const Transporter = require('./models/Transporter');

const initDB = async () => {
  try {
    await connectDB();
    console.log('Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDB();