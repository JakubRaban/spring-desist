package pl.jakubraban.springdesist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.jakubraban.springdesist.mail.DesistEmailService;
import pl.jakubraban.springdesist.model.RegistrationToken;
import pl.jakubraban.springdesist.model.User;
import pl.jakubraban.springdesist.repository.RegistrationTokenRepository;
import pl.jakubraban.springdesist.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final RegistrationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final DesistEmailService emailService;

    @Autowired
    public UserController(UserRepository userRepository, RegistrationTokenRepository tokenRepository, PasswordEncoder encoder, DesistEmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = encoder;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        RegistrationToken token = new RegistrationToken(user);
        tokenRepository.save(token);
        userRepository.save(user);
        emailService.sendMail(
                user.getEmail(),
                "Confirm your Desist registration",
                "Welcome to Desist. Please click the following link to complete your registration" + "\n" +
                        "http://localhost:8080/register/confirm/" + token.getToken()
        );
        return user;
    }

    @PatchMapping("/register/confirm/{token}")
    public User confirmRegistration(@PathVariable String token) {
        RegistrationToken registrationToken = tokenRepository.findByToken(token);
        User confirmedUser = registrationToken.getUser();
        confirmedUser.setEnabled(true);
        userRepository.save(confirmedUser);
        return confirmedUser;
    }

}
