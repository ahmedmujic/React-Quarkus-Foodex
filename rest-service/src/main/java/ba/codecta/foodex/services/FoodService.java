package ba.codecta.foodex.services;

import ba.codecta.foodex.services.model.CategoryDto;
import ba.codecta.foodex.services.model.FoodsDto;

import java.util.List;

public interface FoodService {

   // List<FoodsDto> getAllFoodsByCompanyId(Integer id);

    boolean addFoodByCompanyId(FoodsDto foodsDto, Integer id, Integer categoryId);
    List<CategoryDto> getAllFoodCategories();

}
