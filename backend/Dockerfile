# Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of your backend code to the container
COPY . .

# Expose the port that your Node.js application listens on
EXPOSE 3001

# Command to start your backend application
CMD ["node", "index.js"]
