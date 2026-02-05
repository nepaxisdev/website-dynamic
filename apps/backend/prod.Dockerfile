FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/backend/package.json ./apps/backend/
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

WORKDIR /app/apps/backend
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Payload CMS app
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Copy root package files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json* ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules

# Copy the entire backend directory (includes source files, config, etc.)
COPY --from=builder /app/apps ./apps

# Create root tsconfig.json if it doesn't exist (Payload needs this)
RUN if [ ! -f /app/tsconfig.json ]; then \
      echo '{"compilerOptions": {"baseUrl": ".", "paths": {}}}' > /app/tsconfig.json; \
    fi

# Set working directory to backend
WORKDIR /app/apps/backend

EXPOSE 3000
ENV PORT=3000

# Set Payload config path to the correct location in src directory
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts

# Use next start
CMD ["npx", "next", "start"]
