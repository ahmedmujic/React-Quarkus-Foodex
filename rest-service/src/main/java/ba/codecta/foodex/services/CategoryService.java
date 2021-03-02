package ba.codecta.foodex.services;

import ba.codecta.foodex.services.model.CategoryDto;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> listAllCategories();
}
