package pl.jakubraban.springdesist.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import pl.jakubraban.springdesist.model.Lock;

@Data
@AllArgsConstructor
public class LockOpenResponseForm {

    private Lock openedLock;
    private String plainTextPassword;

}
