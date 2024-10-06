FROM node:20.11.1-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
# COPY prisma ./prisma


# FROM base AS test

# # RUN npm install

# RUN npm i --only=dev

# COPY . .

# CMD [ "npm", "run", "test:watchAll" ]



FROM base AS development

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]



FROM base AS builder


RUN npm -v

RUN npm install

COPY . .

# EXPOSE 3000


RUN npx prisma generate

# RUN npx prisma migrate deploy

RUN npm run build
RUN ls -l /usr/src/app/dist/src/main.js

RUN npm prune --production



FROM builder AS production

# ARG NODE_ENV=production

# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

RUN npm i --only=production

# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/package.json ./
# COPY --from=builder /usr/src/app/.env ./

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
