package pl.jakubraban.springdesist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.jakubraban.springdesist.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
