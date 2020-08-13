package pl.jakubraban.springdesist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jakubraban.springdesist.model.Lock;
import pl.jakubraban.springdesist.repository.LockRepository;

import java.util.List;

@RestController
@Validated
public class LockController {

    private final LockRepository lockRepository;

    @Autowired
    public LockController(LockRepository repository) {
        this.lockRepository = repository;
    }

    @GetMapping("/locks")
    public List<Lock> getUserLocks() {
        return this.lockRepository.findAll();
    }

}
