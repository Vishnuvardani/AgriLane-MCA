const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Farm = require('./models/Farm');
const Transporter = require('./models/Transporter');
const connectDB = require('./config/database');

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await User.deleteMany({});
        await Farm.deleteMany({});
        await Transporter.deleteMany({});
        
        // Create demo users
        const salt = await bcrypt.genSalt(10);
        
        // Only create admin user - others will register through signup
        const adminUser = {
            name: 'Admin User',
            email: 'admin@agrilane.com',
            password: await bcrypt.hash('admin123', salt),
            role: 'admin',
            phone: '1234567890',
            address: 'Admin Office'
        };
        
        await User.create(adminUser);
        console.log('✅ Admin user created');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedDatabase();