package ba.codecta.foodex.repository;

import ba.codecta.foodex.repository.entity.Images;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.awt.*;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class ImagesRepository implements PanacheRepository<Images> {
}
