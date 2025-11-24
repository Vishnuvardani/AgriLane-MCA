<<<<<<< HEAD
# AgriLane - Smart Transportation & Farm-to-Customer Marketplace

A complete web application connecting farms, transporters, and customers with intelligent route optimization and direct marketplace functionality.

## 🚀 Features

- **User Management**: Role-based authentication (Admin, Farmer, Transporter, Customer)
- **Farm Management**: Add/manage farms, track produce inventory
- **Transportation**: Manage vehicles, capacity tracking, route assignment
- **Marketplace**: Direct farm-to-customer sales with real-time ordering
- **Route Optimization**: AI-powered route planning with cost optimization
- **Real-time Dashboard**: Live statistics and data visualization
- **MongoDB Integration**: Complete database storage and retrieval

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs for password hashing
- **Maps**: Leaflet.js with OpenStreetMap

## 📦 Installation

### Quick Start
```bash
# Double-click to run automatically
run-agrilane.bat
```

### Manual Setup
1. **Start MongoDB**:
   ```bash
   mongod --dbpath "C:\data\db"
   ```

2. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Initialize Database**:
   ```bash
   node seedData.js
   ```

4. **Start Server**:
   ```bash
   npm run dev
   ```

5. **Open Application**:
   - Navigate to `login.html` in browser
   - Server runs on `http://localhost:5000`

## 🗄️ Database

- **Name**: `agrilane`
- **URL**: `mongodb://127.0.0.1:27017/agrilane`
- **Collections**: users, farms, transporters, orders, routes

## 🎯 Usage

1. **Sign Up**: Create account with role selection
2. **Login**: Access role-specific dashboard
3. **Add Data**: Farms, transporters, products automatically stored in MongoDB
4. **Place Orders**: Real-time order processing and tracking
5. **Plan Routes**: Optimize delivery routes with cost calculation
6. **Monitor**: Real-time dashboard with live statistics

## 📊 API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/farms` - Get all farms
- `POST /api/farms` - Add new farm
- `GET /api/transporters` - Get all transporters
- `POST /api/transporters` - Add new transporter
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Place new order
- `GET /api/routes` - Get all routes
- `POST /api/routes` - Save new route
- `GET /api/stats` - Get dashboard statistics

## 🔧 Project Structure

```
AgriLane/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── server.js
├── assets/
│   ├── images/
│   └── css/
├── *.html (Frontend pages)
└── README.md
```

## 🌟 Key Features

- **Real-time Updates**: Dashboard counts update automatically
- **Role-based Access**: Different views for each user type
- **Responsive Design**: Works on desktop and mobile
- **Database Integration**: All data stored in MongoDB
- **Route Optimization**: Smart delivery planning
- **Secure Authentication**: Encrypted passwords and sessions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is for educational purposes.

## 📞 Support

For questions or issues, please create an issue in the repository.
=======
# AgriLane-MCA
Smart Transportation &amp; Farm-to-Customer Marketplace
>>>>>>> e5d724531b9511904be236d368ce09bbf5e737a0
