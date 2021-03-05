package ba.codecta.foodex.repository;

import ba.codecta.foodex.repository.entity.Company;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class CompanyRepository implements PanacheRepositoryBase<Company, Integer> {

    public Company getCompanyById(Integer id){
        return findById(id);
    }
}
