const mongoose = require('mongoose');

async function createTestData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/agrilane');
        console.log('✅ Connected to MongoDB');
        
        const db = mongoose.connection.db;
        
        // Create test user
        await db.collection('users').insertOne({
            email: 'test@agrilane.com',
            name: 'Test User',
            phone: '9876543210',
            role: 'customer',
            createdAt: new Date()
        });
        
        // Create test cart
        await db.collection('carts').insertOne({
            userId: 'test@agrilane.com',
            items: [
                { id: 1, name: 'Fresh Tomatoes', price: 50, quantity: 2 },
                { id: 2, name: 'Organic Rice', price: 80, quantity: 1 }
            ],
            total: 180,
            createdAt: new Date()
        });
        
        // Create test order
        await db.collection('orders').insertOne({
            orderId: 'ORD-2024-001',
            userId: 'test@agrilane.com',
            items: [
                { id: 1, name: 'Fresh Tomatoes', price: 50, quantity: 2 }
            ],
            total: 100,
            status: 'completed',
            customerDetails: {
                name: 'Test User',
                phone: '9876543210',
                address: 'Test Address'
            },
            createdAt: new Date()
        });
        
        // Create test transaction
        await db.collection('transactions').insertOne({
            transactionId: 'TXN-2024-001',
            orderId: 'ORD-2024-001',
            amount: 100,
            paymentMethod: 'razorpay',
            status: 'success',
            createdAt: new Date()
        });
        
        // Create test farm
        await db.collection('farms').insertOne({
            farmId: 'FARM-001',
            name: 'Green Valley Farm',
            location: 'Punjab',
            products: ['tomatoes', 'rice', 'wheat'],
            createdAt: new Date()
        });
        
        console.log('✅ Test data created successfully');
        
        // Verify collections
        const collections = await db.listCollections().toArray();
        console.log('\n📁 Collections created:');
        collections.forEach(col => console.log(`  - ${col.name}`));
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createTestData();