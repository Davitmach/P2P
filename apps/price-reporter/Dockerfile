FROM node:22.23.3-alpine3.24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build price-reporter

FROM builder AS dev
CMD ["npm", "run", "start:dev:price-reporter"]

FROM node:22.23.3-alpine3.24 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN npm prune --omit=dev
CMD ["node", "dist/apps/price-reporter/main.js"]