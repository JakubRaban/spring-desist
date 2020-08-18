package pl.jakubraban.springdesist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import pl.jakubraban.springdesist.exception.LockException;
import pl.jakubraban.springdesist.security.SecretKey;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PACKAGE, force = true)
@Getter
@Table(name = "password_lock")
public class Lock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private User owner;

    private String name;
    private String encryptedPassword;
    private LocalDateTime timeCreated;
    private LocalDateTime timeActivated;
    private LocalDateTime expirationTime;

    @Enumerated(EnumType.STRING)
    private LockStatus status;

    @Transient @JsonIgnore private final TextEncryptor encryptor;

    public Lock(User owner, String name, String plainTextPassword) {
        this.encryptor = Encryptors.delux(owner.getPassword(), SecretKey.getForLockOpening());
        this.owner = owner;
        this.name = name;
        this.encryptedPassword = encryptor.encrypt(plainTextPassword);
        this.timeCreated = LocalDateTime.now();
        this.status = LockStatus.CREATED;
    }

    public void activate(Duration duration) {
        if (this.status == LockStatus.ACTIVE) throw new LockException("This lock is already active");
        this.timeActivated = LocalDateTime.now();
        this.expirationTime = this.timeActivated.plus(duration);
        this.status = LockStatus.ACTIVE;
    }

    public String open() {
        if (!isExpired()) throw new LockException("This lock is yet to expire");
        this.status = LockStatus.OPENED;
        return encryptor.decrypt(this.encryptedPassword);
    }

    private boolean isExpired() {
        return expirationTime.isBefore(LocalDateTime.now());
    }

}
