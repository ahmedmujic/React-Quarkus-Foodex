package ba.codecta.foodex.repository;

import ba.codecta.foodex.repository.entity.CompanyCategory;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;


import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class CategoryRepository implements PanacheRepositoryBase<CompanyCategory, Integer> {
}
