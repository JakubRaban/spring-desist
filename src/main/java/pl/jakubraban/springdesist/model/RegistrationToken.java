package pl.jakubraban.springdesist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PACKAGE, force = true)
public class RegistrationToken {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @MapsId
    private User user;

    @Column(length = 36)
    private String token;

    public RegistrationToken(User user) {
        this.user = user;
        this.token = UUID.randomUUID().toString();
    }

    public String getToken() {
        return token;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

}
