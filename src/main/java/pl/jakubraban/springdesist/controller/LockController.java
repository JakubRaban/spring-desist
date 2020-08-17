package pl.jakubraban.springdesist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.jakubraban.springdesist.form.CreateLockForm;
import pl.jakubraban.springdesist.model.Lock;
import pl.jakubraban.springdesist.model.User;
import pl.jakubraban.springdesist.repository.LockRepository;
import pl.jakubraban.springdesist.repository.UserRepository;

import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;
import java.security.Principal;
import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@RestController
@Validated
public class LockController {

    private final LockRepository lockRepository;
    private final UserRepository userRepository;

    @Autowired
    public LockController(LockRepository lockRepository, UserRepository userRepository) {
        this.lockRepository = lockRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/locks")
    public List<Lock> getUserLocks(Principal principal) {
        return userRepository.findByEmail(principal.getName()).getOwnedLocks();
    }

    @PostMapping("/locks")
    public ResponseEntity<Lock> createLock(@RequestBody CreateLockForm form, Principal principal) {
        Lock newLock = new Lock(userRepository.findByEmail(principal.getName()),
                form.getLockIdentifier(),
                form.getPlainTextPassword());
        return new ResponseEntity<>(lockRepository.save(newLock), HttpStatus.CREATED);
    }

    @PostMapping("locks/{id}/activate")
    public ResponseEntity<Lock> activateLock(@PathVariable @Min(1) Long id, @RequestBody @Pattern(regexp = "PT\\d+S") String duration, Principal principal) {
        System.out.println(duration);
        User user = userRepository.findByEmail(principal.getName());
        Lock lockToActivate = lockRepository.findById(id).get();
        if (lockToActivate.getOwner().equals(user)) {
            lockToActivate.activate(Duration.parse(duration));
            lockRepository.save(lockToActivate);
            return new ResponseEntity<>(lockToActivate, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NoSuchElementException.class)
    private ResponseEntity<?> handleNoSuchElement() {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
