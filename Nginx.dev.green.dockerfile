FROM nginx:stable-alpine

WORKDIR /etc/nginx

RUN apk add util-linux
# conf backup 폴더 생성
RUN mkdir ./conf.d/back
RUN mv ./conf.d/*.conf ./conf.d/back/
COPY ./nginx/default-dev.green.conf ./conf.d/default-dev.green.conf
COPY ./nginx/default-dev.blue.conf ./conf.d/default-dev.blue.conf.bak
RUN mkdir /etc/nginx/ssl
COPY ./nginx/ssl/* ./ssl

COPY ./script/shell/change*.sh ./conf.d/

# 개행문자 제거
COPY ./script/shell/remove-newline-char.sh ./
RUN sh remove-newline-char.sh