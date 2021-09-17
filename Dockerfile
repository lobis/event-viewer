FROM node:latest

ENV UPLOADS=/app/server/uploads/
ENV REACT_APP_HOST=155.210.94.111
ENV REACT_APP_PORT=8888

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
