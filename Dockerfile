# FROM node:20.11.1-alpine AS base

# WORKDIR /usr/src/app

# COPY package*.json ./



# FROM base as development

# RUN npm install

# COPY . .

# EXPOSE 7000

# CMD [ "npm", "run", "start:dev" ]



# FROM base AS builder

# # WORKDIR /usr/src/app

# RUN npm -v

# # COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# RUN npm prune --production # Remove dev dependencies



# FROM builder as production

# ARG NODE_ENV=production

# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm i --only=production

# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/package.json .
# COPY --from=builder /usr/src/app/.env .

# CMD [ "npm", "run", "start:prod" ]


FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./
# COPY prisma ./prisma

RUN npm install


COPY . .

EXPOSE 7000

RUN npm i @prisma/client

# RUN npx prisma generate --schema=./prisma/schema.prisma

CMD [ "npm", "run", "start:dev" ]

