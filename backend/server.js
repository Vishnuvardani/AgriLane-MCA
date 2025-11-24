const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/farms', require('./routes/farms'));
app.use('/api/transporters', require('./routes/transporters'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/routes', require('./routes/routes'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/stats', require('./routes/stats'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));