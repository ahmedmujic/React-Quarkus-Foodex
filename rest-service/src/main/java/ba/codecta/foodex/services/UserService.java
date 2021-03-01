package ba.codecta.foodex.services;

import ba.codecta.foodex.services.model.UserAuthDto;
import ba.codecta.foodex.services.model.UserDto;

public interface UserService {

    boolean register(UserAuthDto userAuthDto);
    UserDto login(UserAuthDto userAuthDto);
    boolean userExistsByEmail(String email);
}
