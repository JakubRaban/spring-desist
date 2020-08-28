package pl.jakubraban.springdesist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import pl.jakubraban.springdesist.config.security.SecretKey;
import pl.jakubraban.springdesist.exception.LockException;

import javax.persistence.*;
import java.time.Duration;
import java.time.ZonedDateTime;

@Entity
@Table(name = "password_lock", uniqueConstraints = @UniqueConstraint(columnNames = {"owner_id", "name"}))
@NoArgsConstructor(access = AccessLevel.PACKAGE, force = true)
@Getter
public class Lock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private User owner;

    @Column(length = 50)
    private String name;
    private String encryptedPassword;
    private ZonedDateTime timeCreated;
    private ZonedDateTime timeActivated;
    private ZonedDateTime expirationTime;

    @Enumerated(EnumType.STRING)
    private LockStatus status;

    public Lock(User owner, String name, String plainTextPassword) {
        this.owner = owner;
        this.name = name;
        this.encryptedPassword = getEncryptor().encrypt(plainTextPassword);
        this.timeCreated = ZonedDateTime.now();
        this.status = LockStatus.CREATED;
    }

    public void activate(Duration duration) {
        if (this.status == LockStatus.CREATED || isExpired()) {
            this.timeActivated = ZonedDateTime.now();
            this.expirationTime = this.timeActivated.plus(duration);
        } else {
            this.expirationTime = this.expirationTime.plus(duration);
        }
        this.status = LockStatus.ACTIVE;
    }

    public String open() {
        if (!isExpired()) throw new LockException("This lock is yet to expire");
        this.status = LockStatus.OPENED;
        return getEncryptor().decrypt(this.encryptedPassword);
    }

    private boolean isExpired() {
        return expirationTime.isBefore(ZonedDateTime.now());
    }

    private TextEncryptor getEncryptor() {
        return Encryptors.delux(owner.getPassword(), SecretKey.getForLockOpening());
    }

}
