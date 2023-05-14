# Imagen base con Tomcat y dependencias
FROM tomcat:9.0-alpine

# Copia el war compilado en la capeta interna
COPY /dist/sistemaExcavacion.war /usr/local/tomcat/webapps/

# Establecemos puerto de salida
EXPOSE 8080

# Corremos el war compilado
CMD ["catalina.sh", "run"]