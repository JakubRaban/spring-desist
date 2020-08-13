package pl.jakubraban.springdesist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.jakubraban.springdesist.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.email = ?1 and u.password = ?2")
    User login(String email, String password);

    User findByEmail(String email);

}
