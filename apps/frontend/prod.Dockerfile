# 1. Base image
FROM node:25.1.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 2. Dependencies
FROM base AS deps
# Copy root files for workspace awareness
COPY package.json package-lock.json* ./
# Copy app-specific package files
COPY apps/frontend/package.json ./apps/frontend/
# Install all dependencies (including devDeps for build)
RUN npm ci

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Move to the frontend directory
WORKDIR /app/apps/frontend
# Generate the .svelte-kit directory (the sync step)
RUN npm run check
RUN npm run build

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy the build output and dependencies
COPY --from=builder /app/apps/frontend/build ./build
COPY --from=builder /app/apps/frontend/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5173
ENV PORT=5173

# Run the SvelteKit server
CMD ["node", "build/index.js"]
