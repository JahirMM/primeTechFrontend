# Etapa 1: Build
FROM node:22.1.0-slim AS builder

RUN corepack enable && corepack prepare pnpm@9.1.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Etapa 2: Producción
FROM node:22.1.0-slim

RUN corepack enable && corepack prepare pnpm@9.1.2 --activate

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]