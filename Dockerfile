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


FROM nginx:alpine as production-build

ARG PORT
ENV PORT=${PORT}
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder ./dist /usr/share/nginx/html

EXPOSE 3001
ENTRYPOINT ["nginx", "-g", "daemon off;"]