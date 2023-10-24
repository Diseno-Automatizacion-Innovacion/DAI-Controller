# Start image with a node base image
FROM node:20.8.1-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy files from local to image 
COPY package*.json ./
COPY . /app/

# Install dependencies, create daiShadow and build nextjs app
RUN npm install \
    && apk --no-cache add git \
    && echo "dai:c10b9acc8f36d89d2c6abbbcc50a5380:admin" > /etc/daiShadow \
    && npm run build

# Expose port 3000 which nextjs defaults to
EXPOSE 3000

# Start the app
CMD ["sh", "start.sh"]