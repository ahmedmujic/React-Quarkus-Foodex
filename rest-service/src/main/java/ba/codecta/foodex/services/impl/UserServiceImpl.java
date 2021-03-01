package ba.codecta.foodex.services.impl;

import ba.codecta.foodex.jwt.TokenGenerator;
import ba.codecta.foodex.repository.UserRepository;
import ba.codecta.foodex.repository.entity.UserEntity;
import ba.codecta.foodex.services.UserService;
import ba.codecta.foodex.services.model.UserAuthDto;
import ba.codecta.foodex.services.model.UserDto;
import com.password4j.Password;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;

@ApplicationScoped
@Transactional
public class UserServiceImpl implements UserService {

    @Inject
    UserRepository userRepository;

    @Override
    public boolean register(UserAuthDto userAuthDto) {
        UserEntity userEntity = userRepository.findByEmail(userAuthDto.getEmail());

        if(userEntity != null){
            return false;
        }
        else{
            UserEntity userEntity1 = new UserEntity();
            userEntity1.setEmail(userAuthDto.getEmail());
            userEntity1.setName(userAuthDto.getName());
            userEntity1.setPasswordHash(Password.hash(userAuthDto.getPassword()).withBCrypt().getResult());
            userRepository.persist(userEntity1);
            return true;
        }

    }

    @Override
    public UserDto login(UserAuthDto userAuthDto) {
        UserEntity userEntity = userRepository.findByEmail(userAuthDto.getEmail());

        if(userEntity != null){
            System.out.println("logovali smo se jer je razlicito od null");
            UserDto userDto = new UserDto();
            userDto.setUsername(userEntity.getName());
            userDto.setEmail(userEntity.getEmail());
            userDto.setId(userEntity.getId());
            userDto.setToken(TokenGenerator.generateJwtTokenWithUserInfo(userEntity, new ArrayList<String>(Arrays.asList("User"))));
            return userDto;
        }

        else{
            System.out.println("ispod ifa");
            return null;
        }
    }

    @Override
    public boolean userExistsByEmail(String email) {
        return userRepository.find("email", email) != null ? true : false;
    }
}
