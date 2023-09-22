# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of your frontend code to the container
COPY . .

# Build your React app
RUN yarn run build

# Stage 2: Create the production image
FROM nginx:1.21.1-alpine

# Copy nginx configuration (make sure it only contains global settings)
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port your React app runs on (if needed)
EXPOSE 80

# The CMD or ENTRYPOINT to start the Nginx server is already defined in the nginx image
