@echo off
echo ========================================
echo       AgriLane Docker Deployment
echo ========================================
echo.

echo 1. Building and starting containers...
docker-compose up --build -d

echo.
echo 2. Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo 3. Initializing database...
docker-compose exec backend node seedData.js

echo.
echo ========================================
echo        AgriLane is now running!
echo ========================================
echo Frontend: http://localhost:8080
echo Backend API: http://localhost:5000
echo MongoDB: localhost:27017
echo.
echo To stop: docker-compose down
echo To view logs: docker-compose logs
echo ========================================

pause