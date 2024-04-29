
FROM node:21

WORKDIR /base

COPY ["package.json", "./package.json"]
COPY [".yarnrc", "./.yarnrc"]
COPY [".npmrc", "./.npmrc"]
COPY [".eslintrc.js", "./.eslintrc.js"]
COPY ["turbo.json", "./turbo.json"]
COPY ["yarn.lock", "./yarn.lock"]
COPY ["tsconfig.json", "./tsconfig.json"]

COPY ["packages/typescript-config", "./packages/typescript-config"]
COPY ["packages/eslint-config", "./packages/eslint-config"]
COPY ["backend/backend-common", "./backend/backend-common"]
COPY ["packages/common", "./packages/common"]
COPY ["backend/indexer", "./backend/indexer"]


RUN cd /base
RUN yarn install
RUN yarn run build

EXPOSE 8088

WORKDIR /base/backend/indexer

CMD ["yarn", "dev"]
