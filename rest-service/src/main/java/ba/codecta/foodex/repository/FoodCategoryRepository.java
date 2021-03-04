package ba.codecta.foodex.repository;
import ba.codecta.foodex.repository.entity.CompanyCategory;
import ba.codecta.foodex.repository.entity.FoodCategory;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;


import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)


public class FoodCategoryRepository implements PanacheRepositoryBase<FoodCategory, Integer> {

    public FoodCategory getCategoryById(Integer id){
        return  find("id",id).firstResult();
    }
}
