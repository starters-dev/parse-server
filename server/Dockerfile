FROM node:latest

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN yarn

EXPOSE 6969

CMD [ "yarn", "start" ]