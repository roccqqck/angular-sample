# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16-bullseye-slim as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app

# Install all the dependencies
RUN ls -alF /app ; \
    npm config set strict-ssl false ; \

    ## custom npm default registry
    # npm config set registry https://registry.npmjs.org/ ; \

    ## npm install custom registry
    # npm install --registry=https://registry.npmjs.org/ ; \  

    npm install --verbose ; \
    npm run build ; \
    ls -alF /app


# Stage 2: Serve app with nginx server

FROM bitnami/nginx:1.20

USER root
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/i-leo-bank /usr/share/nginx/html/

COPY ./frontend-docker-default-8080.conf /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf

USER 1001
