package pl.jakubraban.springdesist.form;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Pattern;

@Data
@RequiredArgsConstructor
public class CreateLockForm {

    private String lockIdentifier;
    private String plainTextPassword;

}
