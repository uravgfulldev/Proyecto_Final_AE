FROM eclipse-temurin:17-jdk

COPY /dist/messageEndpoint.jar /usr/src/myapp/

WORKDIR /usr/src/myapp/

CMD ["java", "-jar", "messageEndpoint.jar"]