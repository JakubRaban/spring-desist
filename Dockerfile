FROM node as frontend
RUN mkdir app
WORKDIR app
COPY webpack.config.js package.json ./
RUN npm install
RUN mkdir src
COPY src/main/js src
RUN npm run dev

FROM gradle:6.6-jdk11
VOLUME /tmp
COPY build.gradle settings.gradle ./
RUN gradle clean build --no-daemon > /dev/null 2>&1 || true
COPY --from=frontend app/bundle.js app/bundle.js.map src/main/resources/static/built/
COPY src src
RUN gradle clean assemble --no-daemon
ENTRYPOINT ["java", "-jar", "build/libs/spring-desist-0.0.1-SNAPSHOT.jar"]