cp -r ./front-build ./volume/
java -jar "-Dspring.profiles.active=prod" ./maple.jar
