ARG project=nestjs_sandbox

# build phase
FROM node:14.5.0 as builder

ARG project
ARG maintainer=rargue22@gmail.com

LABEL maintainer=${mantainer} name=${project}

WORKDIR /${project}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run test

# deploy phase
FROM node:14.5.0-alpine3.10

ARG project
ARG user=nestjsuser

RUN adduser --disabled-password --geco '${user}' ${user} && \
    mkdir -p ${project} && \
    chown -R ${user}:${user} /${project}

USER ${user}

COPY --from=builder /${project}/dist /${project}/dist
COPY --from=builder /${project}/node_modules /${project}/node_modules
COPY --from=builder /${project}/package.json /${project}/package.json
COPY --from=builder /${project}/package-lock.json /${project}/package-lock.json

WORKDIR /${project}

ENTRYPOINT [ "npm", "start:dev" ]

EXPOSE 3000



