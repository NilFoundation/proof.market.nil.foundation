# STAGE 1.Build static assets
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm set-script prepare "" && npm install && npm run build

# STAGE 2. Serve static files with nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
