FROM node:14

# Install Docker dependencies
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh && \
    sh get-docker.sh

WORKDIR /learn-linux

COPY package*.json ./

RUN npm install cookie-parser
RUN npm install express-session

COPY . .

RUN chmod +x ./webtop/create_session.sh
RUN chmod +x ./webtop/close_all_sessions.sh

EXPOSE 3000

CMD [ "node", "server/app.js" ]

