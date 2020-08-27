package pl.jakubraban.springdesist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class RegistrationToken {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JsonIgnore
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

}
