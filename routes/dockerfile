FROM node:18-slim

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port 3000 (standard for Express)
EXPOSE 3000

# IMPORTANT: This must match your start script "node server.js"
CMD ["node", "server.js"]
