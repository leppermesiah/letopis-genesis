FROM node:22.20.0-alpine3.22 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run typecheck && npm run check && npm run build

FROM node:22.20.0-alpine3.22
LABEL org.opencontainers.image.title="Letopis - Genesis" \
      org.opencontainers.image.description="Combine elements and rebuild the universe" \
      org.opencontainers.image.source="https://github.com/leppermesiah/letopis-genesis" \
      org.opencontainers.image.licenses="PolyForm-Noncommercial-1.0.0" \
      net.unraid.docker.icon="https://raw.githubusercontent.com/leppermesiah/letopis-genesis/main/public/icon-512.png" \
      net.unraid.docker.webui="http://[IP]:[PORT:2230]/"
WORKDIR /app
ENV NODE_ENV=production \
    GENESIS_PORT=2230 \
    GENESIS_DATA=/data \
    GENESIS_UNLOCK_PERCENT=100 \
    GENESIS_ADMIN_PIN= \
    TZ=Europe/Sofia
COPY --from=build /app/dist ./dist
COPY LICENSE.md README.md CREDITS.md ./
# Unraid default: nobody:users (99:100)
RUN mkdir -p /data && chown 99:100 /data
USER 99:100
VOLUME /data
EXPOSE 2230
HEALTHCHECK --interval=60s --timeout=5s --start-period=20s CMD wget -qO- http://127.0.0.1:2230/api/health > /dev/null || exit 1
CMD ["node", "--disable-warning=ExperimentalWarning", "dist/server.js"]
