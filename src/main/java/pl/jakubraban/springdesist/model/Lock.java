package pl.jakubraban.springdesist.model;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import pl.jakubraban.springdesist.exception.LockException;
import pl.jakubraban.springdesist.security.SecretKey;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@Table(name = "password_lock")
public class Lock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User lockOwner;

    private String lockIdentifier;
    private String encryptedPassword;
    private LocalDateTime timeCreated;
    private LocalDateTime timeActivated;
    private LocalDateTime expirationTime;

    @Enumerated(EnumType.STRING)
    private LockStatus lockStatus;

    @Transient private final TextEncryptor encryptor = Encryptors.delux(lockOwner.getPassword(), SecretKey.getForLockOpening());

    public Lock(User lockOwner, String lockIdentifier, String plainTextPassword) {
        this.lockOwner = lockOwner;
        this.lockIdentifier = lockIdentifier;
        this.encryptedPassword = encryptor.encrypt(plainTextPassword);
        this.timeCreated = LocalDateTime.now();
        this.lockStatus = LockStatus.CREATED;
    }

    public void activate(Duration duration) {
        if (this.lockStatus == LockStatus.ACTIVE) throw new LockException("This lock is already active");
        this.timeActivated = LocalDateTime.now();
        this.expirationTime = this.timeActivated.plus(duration);
        this.lockStatus = LockStatus.ACTIVE;
    }

    public String open() {
        if (!isExpired()) throw new LockException("This lock is yet to expire");
        this.lockStatus = LockStatus.OPENED;
        return encryptor.decrypt(this.encryptedPassword);
    }

    private boolean isExpired() {
        return expirationTime.isBefore(LocalDateTime.now());
    }

}
