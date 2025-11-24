# AgriLane Backend Setup

## Prerequisites
- Node.js installed
- MongoDB Compass installed
- MongoDB running on localhost:27017

## Installation

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service

4. Seed the database:
```bash
node seedData.js
```

5. Start the server:
```bash
npm run dev
```

## MongoDB Collections Created:
- users
- farms  
- transporters
- orders
- routes

## API Endpoints:
- POST /api/users/register
- POST /api/users/login
- GET /api/farms
- POST /api/farms
- GET /api/transporters
- POST /api/transporters
- GET /api/orders
- POST /api/orders
- GET /api/routes
- POST /api/routes

Server runs on http://localhost:5000