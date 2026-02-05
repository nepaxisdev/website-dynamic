# Development Dockerfile for SvelteKit Frontend with HMR
FROM node:25.1.0-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY apps/frontend/package.json ./apps/frontend/

RUN npm install --os=linux --libc=musl --cpu=arm64 sharp

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy all source code
COPY . .

# Set working directory to frontend
WORKDIR /app/apps/frontend

# Expose Vite dev server port
EXPOSE 5173

# Set environment to development
ENV NODE_ENV=development

# Run the dev server with HMR
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
