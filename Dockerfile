# Use official Node.js image as base
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/dist/your-app-name /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
