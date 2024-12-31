# Use an official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Set the environment variables
ENV LOGIN_URL=${LOGIN_URL}
ENV ADMIN_URL=${ADMIN_URL}
ENV TEMPLATES_URL=${TEMPLATES_URL}

# Expose the port your app runs on
EXPOSE 5000

# Command to run your application
CMD ["npm", "start"]
