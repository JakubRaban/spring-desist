package pl.jakubraban.springdesist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.jakubraban.springdesist.model.Lock;

public interface LockRepository extends JpaRepository<Lock, Long> { }
