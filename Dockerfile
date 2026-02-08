# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY src/typer-teacher/package.json src/typer-teacher/package-lock.json ./
RUN npm ci
COPY src/typer-teacher/ ./
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# SPA fallback: serve index.html for all routes
RUN printf 'server {\n  listen 80;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html;\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
