# Step 1: Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a smaller web server (e.g., Nginx) to serve the app
FROM nginx:alpine

# Step 8: Copy the build folder from the previous stage into Nginx’s html folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to allow access to the app
EXPOSE 80

# Step 10: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
