package pl.jakubraban.springdesist.form;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginForm {

    private String email;
    private String password;

}
