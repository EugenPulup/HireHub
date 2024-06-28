FROM node:18.14.2 AS base

RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and pnpm-lock.yaml if you have it
COPY package.json package.json

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# ===== Development Stage =====
FROM base AS dev

EXPOSE 3000 
EXPOSE 24678 

CMD [ "pnpm", "run", "dev" ]
# ===== Development Stage =====

# ===== Production Stage =====
FROM base AS prod

WORKDIR /app/apps/dashboard

# Expose the port the app runs on
EXPOSE 3000

# Build the NestJS app
RUN pnpm build

CMD ["node", ".output/server/index.mjs"]
# ===== Production Stage =====
