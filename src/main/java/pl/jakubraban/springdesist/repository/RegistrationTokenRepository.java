package pl.jakubraban.springdesist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jakubraban.springdesist.model.RegistrationToken;

public interface RegistrationTokenRepository extends JpaRepository<RegistrationToken, Long> {

    RegistrationToken findByToken(String token);

}
