FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install -g typeorm
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]