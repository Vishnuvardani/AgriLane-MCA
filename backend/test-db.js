const mongoose = require('mongoose');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const Transaction = require('./models/Transaction');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/agrilane', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function testDatabase() {
    try {
        console.log('🔗 Connected to MongoDB');
        
        // Test Cart creation
        const testCart = new Cart({
            userId: 'test_user_123',
            items: [{
                farmId: 'farm_001',
                productName: 'Test Tomatoes',
                farmName: 'Test Farm',
                price: 50,
                quantity: 2
            }]
        });
        
        await testCart.save();
        console.log('✅ Cart test data saved to "carts" collection');
        
        // Test Order creation
        const testOrder = new Order({
            orderId: 'ORD-TEST-123',
            customer: {
                id: 'test_user_123',
                name: 'Test User',
                email: 'test@example.com',
                phone: '+91 9876543210'
            },
            deliveryAddress: {
                address: 'Test Address',
                city: 'Test City',
                pincode: '123456'
            },
            deliveryDate: '2024-01-20',
            items: [{
                farmId: 'farm_001',
                productName: 'Test Tomatoes',
                farmName: 'Test Farm',
                quantity: 2,
                price: 50
            }],
            subtotal: 100,
            deliveryCharges: 30,
            tax: 5,
            totalAmount: 135
        });
        
        await testOrder.save();
        console.log('✅ Order test data saved to "orders" collection');
        
        // Test Transaction creation
        const testTransaction = new Transaction({
            orderId: 'ORD-TEST-123',
            customerId: 'test_user_123',
            amount: 135,
            paymentMethod: 'razorpay',
            transactionId: 'TXN_TEST_123',
            status: 'completed'
        });
        
        await testTransaction.save();
        console.log('✅ Transaction test data saved to "transactions" collection');
        
        console.log('\n📊 Database Collections Created:');
        console.log('1. "carts" - Stores user shopping carts');
        console.log('2. "orders" - Stores order details');
        console.log('3. "transactions" - Stores payment transactions');
        console.log('4. "users" - Stores user accounts');
        console.log('5. "farms" - Stores farm information');
        
        // Clean up test data
        await Cart.deleteOne({ userId: 'test_user_123' });
        await Order.deleteOne({ orderId: 'ORD-TEST-123' });
        await Transaction.deleteOne({ orderId: 'ORD-TEST-123' });
        console.log('\n🧹 Test data cleaned up');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Database test failed:', error);
        process.exit(1);
    }
}

testDatabase();