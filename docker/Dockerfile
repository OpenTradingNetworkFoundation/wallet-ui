FROM node:8.10

WORKDIR /app
EXPOSE 80

# Install nginx
RUN apt-get update \
  && apt-get install -y nginx --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD public public

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ADD src src