FROM node:16.16-buster-slim
LABEL maintainer="Fabrice Le Gallic"


# Create app directory
WORKDIR /usr/src/app

# Copy files dependencies
COPY package*.json ./
# Install app dependencies
RUN npm install
# building code for production
RUN npm ci --only=production
# Copy app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]