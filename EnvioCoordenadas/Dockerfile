FROM eclipse-temurin:17-jdk

COPY /dist/envioCoordenadas.jar /usr/src/myapp/
COPY /dist/lib/*.jar /usr/src/myapp/lib/

WORKDIR /usr/src/myapp/

CMD ["java", "-jar", "envioCoordenadas.jar"]