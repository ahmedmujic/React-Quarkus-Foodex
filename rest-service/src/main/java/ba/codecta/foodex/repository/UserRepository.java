package ba.codecta.foodex.repository;

import ba.codecta.foodex.repository.entity.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UserRepository implements PanacheRepository<UserEntity> {

    public UserEntity findByName(String username){
        return find("name", username).firstResult();
    }

    public  UserEntity findByEmail(String email){
        return find("email", email).firstResult();
    }
}
