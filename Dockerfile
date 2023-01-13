# STAGE 1.Build static assets
FROM node:16-alpine AS builder

# Set env variables to pass into react app
ARG REACT_APP_BASE_API_URL
ARG REACT_APP_DBMS_DEFAULT_DATABASE=market
ARG REACT_APP_UPDATE_ORDER_BOOK_INTERVAL=3000
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_FORMSPREE_FORM_ID
ARG REACT_APP_READONLY_USER
ARG REACT_APP_SITE_DEFAULT_TITLE
ARG REACT_APP_GA_TRACKING_ID
ARG REACT_APP_PROOFMARKET_TOOLCHAIN_REPO

ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL \
  REACT_APP_DBMS_DEFAULT_DATABASE=$REACT_APP_DBMS_DEFAULT_DATABASE \
  REACT_APP_UPDATE_ORDER_BOOK_INTERVAL=$REACT_APP_UPDATE_ORDER_BOOK_INTERVAL \
  REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN \
  REACT_APP_FORMSPREE_FORM_ID=$REACT_APP_FORMSPREE_FORM_ID \
  REACT_APP_READONLY_USER=$REACT_APP_READONLY_USER \
  REACT_APP_SITE_DEFAULT_TITLE=$REACT_APP_SITE_DEFAULT_TITLE \
  REACT_APP_GA_TRACKING_ID=$REACT_APP_GA_TRACKING_ID \
  REACT_APP_PROOFMARKET_TOOLCHAIN_REPO=$REACT_APP_PROOFMARKET_TOOLCHAIN_REPO

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
