FROM openjdk:17-alpine

WORKDIR /home/maple

ARG JAR_FILE=./build/libs/maple-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} ./maple.jar

#RUN cd /frontend
#RUN npm run build
COPY start-app.sh .
COPY ./frontend/build ./front-build

ENTRYPOINT ["sh","./start-app.sh"]