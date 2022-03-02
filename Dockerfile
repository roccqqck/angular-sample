# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app

# Install all the dependencies
RUN npm config set strict-ssl false ; \
    # npm config set registry https://registry.npmjs.org/ ; \
    # npm install --registry=<registry url> ; \
    npm install ; \
    npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/sample-angular-app /usr/share/nginx/html

COPY ./nginx-angular.conf /etc/nginx/conf.d/nginx-angular.conf

# Expose port 80
EXPOSE 80