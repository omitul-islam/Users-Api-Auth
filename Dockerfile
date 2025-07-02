# Stage 1: Builder
FROM node:22.14.0 AS builder

WORKDIR /src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Runtime
FROM node:22.14.0-slim

WORKDIR /app

# Only copy built output and runtime files
COPY --from=builder /src/app/dist ./dist
COPY --from=builder /src/app/package*.json ./
COPY --from=builder /src/app/.env .env

# Install only production deps
RUN npm install --omit=dev

CMD ["node", "dist/src/main.js"]
