# Desist
Desist stops you from accessing your own online accounts by securely storing your passwords and not letting you see them until some period of time (given by you) passes.

## How it works
**Short demo available on YouTube [here](https://youtu.be/BZd3ef44_6s)**

Assume you don't want to visit your Facebook account for the following week:
- Register, confirm your email and login into Desist
- Create a _lock_ (named Facebook or likewise) and give it some random, immemorizable password (or press "Generate randomly")
- Copy the password and set it as your Facebook password
- Click on "Activate" and choose 7 days as the activation period

And that's it! Passwords are stored encrypted in the database (using 256-bit AES) so no one can access them. After 7 days, press "Give back my password" and enjoy your Facebook.

## How it's done
- Server created with [Java](http://java.com) & [Spring Boot](https://spring.io/), secured with Spring Boot Security, deboilerplatized using [Lombok](https://projectlombok.org/)
- Object model mapped to [MySQL](https://www.mysql.com/) database using [Hibernate](https://hibernate.org/) and Spring JPA
- Web client created using [ReactJS](https://reactjs.org/), managing state with [Redux](https://redux.js.org/), bundled into single file using [Webpack](https://webpack.js.org/)+[Babel](https://babeljs.io/) and served as a Single Page Application (SPA)
- Navigating through SPA done using [React Router DOM](https://reactrouter.com/) library
- Nice look provided by [Bootstrap](https://getbootstrap.com/) (or, more accurately, by its React components from [React-Bootstrap](https://react-bootstrap.github.io/)) library
- Server-client architecture with communication using REST, HTTP requests sent by [Axios](https://github.com/axios/axios)
- HTTP authentication via [JSON Web Tokens](https://jwt.io/) (JWT) API for Java
- Emails sent using Spring Mail
- Containerized and assembled using [Docker and Compose](https://www.docker.com/get-started)

## Features
- Registration process with email account confirmation
- Login using email and password
- Creating new locks, copying their passwords, activating and opening them via UI
- Deleting locks, with appropriate message if it's still active

## Running it on your local machine
### Prerequisites
In order to run Desist you need to install [Docker & Compose](https://www.docker.com/get-started) first.

### Preparation
- Clone the repository: `git clone https://github.com/JakubRaban/spring-desist.git`
- In `src/main/resources/application.yml`, under `spring.mail` key, set your email provider's SMTP configuration -- activation emails will come from that address
- In `pl.jakubraban.springdesist.config.security` package, create a file `SecretKey.java` with the following code:
```java
package pl.jakubraban.springdesist.config.security;
public class SecretKey {
    public static byte[] getForJwt() {
        return "ABCDEFGHIJ0123456789abcdefghij!@#$%^&*()1234567890qwertyuiopASDF".getBytes();
    }
    public static String getForLockOpening() {
        return "0123456789ABCDEF0123456789ABCDEF";
    }
}
```
where `getForJWT()` returns byte array of length 64 and `getForLockOpening()` returns hexadecimal String of length 32.

### Execution
In project's main directory, run:
```
$ docker-compose up
```
It will automatically download all required images and run the application.
