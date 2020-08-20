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
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Consumer;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NO_CONTENT;

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
                form.getLockName(),
                form.getPlainTextPassword());
        return new ResponseEntity<>(lockRepository.save(newLock), HttpStatus.CREATED);
    }

    @PatchMapping("locks/{id}/activate")
    public ResponseEntity<Lock> activateLock(@PathVariable @Min(1) Long id, @RequestBody @Pattern(regexp = "PT\\d+S") String duration, Principal principal) {
        return this.doIfOwnsLock(principal, id, lock -> {
            lock.activate(Duration.parse(duration));
            lockRepository.save(lock);
        }).map(lock -> new ResponseEntity<>(lock, OK)).orElse(new ResponseEntity<>(FORBIDDEN));
    }

    @PatchMapping("/locks/{id}/open")
    public ResponseEntity<String> openLock(@PathVariable @Min(1) Long id, Principal principal) {
        AtomicReference<String> plainTextPassword = new AtomicReference<>();
        return this.doIfOwnsLock(principal, id, lock -> {
            plainTextPassword.set(lock.open());
            lockRepository.save(lock);
        }).map(lock -> new ResponseEntity<>(plainTextPassword.get(), OK)).orElse(new ResponseEntity<>(FORBIDDEN));
    }

    @DeleteMapping("/locks/{id}")
    public ResponseEntity<Lock> deleteLock(@PathVariable @Min(1) Long id, Principal principal) {
        return this.doIfOwnsLock(principal, id, lockRepository::delete)
                .map(lock -> new ResponseEntity<Lock>(NO_CONTENT))
                .orElse(new ResponseEntity<>(FORBIDDEN));
    }

    private Optional<Lock> doIfOwnsLock(Principal principal, Long lockId, Consumer<Lock> operation) {
        User user = userRepository.findByEmail(principal.getName());
        Lock requestedLock = lockRepository.findById(lockId).get();
        if (requestedLock.getOwner().equals(user)) {
            operation.accept(requestedLock);
            return Optional.of(requestedLock);
        }
        return Optional.empty();
    }

    @ExceptionHandler(NoSuchElementException.class)
    private ResponseEntity<?> handleNoSuchElement() {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
