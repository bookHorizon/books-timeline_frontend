# stage1 as builder
FROM node:20-alpine as builder

WORKDIR .

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build


FROM nginx:1.30.1-alpine as production-build
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN sed -i "s/listen 80;/listen ${NGINX_PORT};/" /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder ./dist /usr/share/nginx/html

EXPOSE 3001
ENTRYPOINT ["nginx", "-g", "daemon off;"]