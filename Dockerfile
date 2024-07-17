FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ======= BUILD =======
FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run -r build
RUN pnpm deploy --filter=dashboard --prod /prod/dashboard
RUN pnpm deploy --filter=be-finder --prod /prod/be-finder
RUN pnpm deploy --filter=be-gateway --prod /prod/be-gateway
# ======= BUILD =======


# ======= DASHBOARD =======
FROM base AS dashboard

COPY --from=build /prod/dashboard /prod/dashboard

WORKDIR /prod/dashboard

EXPOSE 3000
EXPOSE 24678 

CMD [ "pnpm", "dev" ]
# ======= DASHBOARD =======


# ======= FINDER =======
FROM base AS finder

COPY --from=build /prod/be-finder /prod/be-finder
WORKDIR /prod/be-finder

EXPOSE 3000

CMD [ "pnpm", "start:dev" ]
# ======= FINDER =======


# ======= GATEWAY =======
FROM base AS gateway

COPY --from=build /prod/be-gateway /prod/be-gateway
WORKDIR /prod/be-gateway

EXPOSE 3000

CMD [ "pnpm", "start:dev" ]
# ======= GATEWAY =======
