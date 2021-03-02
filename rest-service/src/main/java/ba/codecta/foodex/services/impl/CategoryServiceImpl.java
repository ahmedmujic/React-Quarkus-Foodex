package ba.codecta.foodex.services.impl;

import ba.codecta.foodex.helpers.ObjectMapperUtils;
import ba.codecta.foodex.repository.CategoryRepository;
import ba.codecta.foodex.services.CategoryService;
import ba.codecta.foodex.services.model.CategoryDto;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Inject
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> listAllCategories() {
        return ObjectMapperUtils.mapAll(categoryRepository.listAll(), CategoryDto.class);
    }
}
