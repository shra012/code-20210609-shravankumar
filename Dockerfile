FROM node:15

# Label Authors
LABEL authors="Shravankumar Nagarajan"
# Set environment variables
ENV HOST=0.0.0.0 PORT=8080
# Create app directory
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied when available
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source files
COPY . .
# Expose port
EXPOSE 8080
# Start Command
CMD [ "node", "server.js" ]