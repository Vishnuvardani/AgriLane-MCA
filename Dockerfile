FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]