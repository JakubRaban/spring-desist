package pl.jakubraban.springdesist.form;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateLockForm {

    private String lockName;
    private String plainTextPassword;

}
