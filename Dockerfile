# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
# COPY ./src ./src
# COPY ./public ./public
COPY . /app/
# COPY ./next.config.js ./next.config.js

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && echo "dai:c10b9acc8f36d89d2c6abbbcc50a5380:admin" > /etc/daiShadow \
    && npm run build

# && rm -fr node_modules

EXPOSE 3000

# Start the app using serve command
CMD [ "npm", "run", "start" ]