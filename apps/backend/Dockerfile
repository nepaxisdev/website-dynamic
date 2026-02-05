# Development Dockerfile for Payload CMS Backend with HMR
FROM node:22.17.0-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY apps/backend/package.json ./apps/backend/


RUN npm install --os=linux --libc=musl --cpu=arm64 sharp

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy all source code
COPY . .

# Create root tsconfig.json if it doesn't exist (Payload needs this)
RUN if [ ! -f /app/tsconfig.json ]; then \
      echo '{"compilerOptions": {"baseUrl": ".", "paths": {}}}' > /app/tsconfig.json; \
    fi

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose Next.js dev server port
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts

# Run the Next.js dev server with HMR
CMD ["npm", "run", "dev"]
