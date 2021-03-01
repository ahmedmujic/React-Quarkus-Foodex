package ba.codecta.foodex.repository;

import ba.codecta.foodex.repository.entity.Food;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class FoodRepository implements PanacheRepository<Food> {


}
