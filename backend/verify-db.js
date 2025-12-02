const mongoose = require('mongoose');

async function verifyDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/agrilane');
        console.log('✅ Connected to MongoDB AgriLane database');
        
        const db = mongoose.connection.db;
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('\n📁 Collections in AgriLane database:');
        collections.forEach(col => console.log(`  - ${col.name}`));
        
        // Check each collection
        const collectionNames = ['carts', 'orders', 'transactions', 'users', 'farms'];
        
        for (const collName of collectionNames) {
            const collection = db.collection(collName);
            const count = await collection.countDocuments();
            console.log(`\n📊 ${collName.toUpperCase()} Collection:`);
            console.log(`  Documents: ${count}`);
            
            if (count > 0) {
                const sample = await collection.findOne();
                console.log(`  Sample document:`, JSON.stringify(sample, null, 2));
            }
        }
        
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

verifyDatabase();