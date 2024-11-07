# Use a Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Compile the TypeScript code
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
