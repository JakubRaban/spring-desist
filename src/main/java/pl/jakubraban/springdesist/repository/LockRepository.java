package pl.jakubraban.springdesist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.jakubraban.springdesist.model.Lock;
import pl.jakubraban.springdesist.model.User;

import java.util.Set;

public interface LockRepository extends JpaRepository<Lock, Long> {

    Set<Lock> findAllByOwner(User lockOwner);
    Lock findByName(String name);

}
