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
RUN pnpm deploy --filter=finder-microservice --prod /prod/finder-microservice
RUN pnpm deploy --filter=gateway-microservice --prod /prod/gateway-microservice
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

COPY --from=build /prod/finder-microservice /prod/finder-microservice
WORKDIR /prod/finder-microservice

EXPOSE 3000

CMD [ "pnpm", "start:dev" ]
# ======= FINDER =======


# ======= GATEWAY =======
FROM base AS gateway

COPY --from=build /prod/gateway-microservice /prod/gateway-microservice
WORKDIR /prod/gateway-microservice

EXPOSE 3000

CMD [ "pnpm", "start:dev" ]
# ======= GATEWAY =======
