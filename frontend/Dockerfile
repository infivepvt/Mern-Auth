# Use Node.js 22 base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port that Vite uses
EXPOSE 5174

# Command to run the Vite development server
CMD ["npm", "run", "dev"]
