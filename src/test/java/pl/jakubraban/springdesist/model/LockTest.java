package pl.jakubraban.springdesist.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.Duration;

import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class LockTest {

    private User user;
    private Lock lock;
    private String plainTextPassword = "ala123";

    @BeforeEach
    void setUp() {
        user = new User();
        user.setName("User Example");
        user.setEmail("user@example.com");
        user.setPassword("user123");
        user.setEnabled(true);
        lock = new Lock(user, "test", plainTextPassword);
    }

    @Test
    void test_whenLockIsCreated_passwordIsEncrypted() {
        assertNotEquals(lock.getEncryptedPassword(), plainTextPassword);
    }

    @Test
    void test_whenLockIsCreated_appropriateStatusIsSet() {
        assertEquals(lock.getStatus(), LockStatus.CREATED);
    }

    @Test
    void test_whenLockIsOpened_samePasswordIsReturned() throws InterruptedException {
        lock.activate(Duration.ZERO);
        Thread.sleep(50);
        String decryptedPassword = lock.open();
        assertEquals(decryptedPassword, plainTextPassword);
    }

}
