# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS dependencies
WORKDIR /app

RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM dependencies AS builder
COPY . .
ENV NODE_ENV=production

RUN yarn build:nest && yarn build:next

FROM node:20-bookworm-slim AS production
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4000

RUN corepack enable && groupadd --system app && useradd --system --gid app app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/mock.json ./mock.json

USER app
EXPOSE 4000

CMD ["node", "dist/main"]
