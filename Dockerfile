FROM node:latest

RUN apt-get update && \
    apt-get install -y xserver-xorg-dev libxi-dev libxext-dev && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/cache/apt/archives/* && \
    rm -rf /var/lib/apt/lists/*

COPY ./ /app

WORKDIR /app/server

RUN npm install

WORKDIR /app/client

RUN npm install && npm run build

WORKDIR /app/server

CMD ["node", "index.js"]