package pl.jakubraban.springdesist.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.jakubraban.springdesist.model.User;
import pl.jakubraban.springdesist.repository.UserRepository;

import java.util.Objects;

@Service
public class UserRepositoryUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Autowired
    public UserRepositoryUserDetailsService(UserRepository userRepository) {
        this.userRepo = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("User with email '" + email + "' not found");
        }
        return user;
    }
}
