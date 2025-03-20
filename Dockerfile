# Build stage
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# Find the actual build output directory (this will help debug)
RUN ls -la /app/dist

# Production stage
FROM nginx:alpine

# Copy the build output - using a more general path that should work regardless of app name
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]