package ba.codecta.foodex.services.impl;

import ba.codecta.foodex.helpers.ObjectMapperUtils;
import ba.codecta.foodex.repository.CompanyRepository;
import ba.codecta.foodex.repository.FoodCategoryRepository;
import ba.codecta.foodex.repository.FoodRepository;
import ba.codecta.foodex.repository.ImagesRepository;
import ba.codecta.foodex.repository.entity.Company;
import ba.codecta.foodex.repository.entity.Food;
import ba.codecta.foodex.repository.entity.Images;
import ba.codecta.foodex.services.FoodService;
import ba.codecta.foodex.services.model.CategoryDto;
import ba.codecta.foodex.services.model.FoodsDto;
import ba.codecta.foodex.services.model.ImageDto;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class FoodServiceImpl implements FoodService {

    @Inject
    FoodRepository foodRepository;


    @Inject
    CompanyRepository companyRepository;

    @Inject
    FoodCategoryRepository foodCategoryRepository;

    @Inject
    ImagesRepository imagesRepository;
    /*@Override
    public List<FoodsDto> getAllFoodsByCompanyId(Integer id) {
        List<Food> foods
                = foodRepository.;
        List<FoodsDto> foodsDtos = new ArrayList<>();
        for (Food food : foods) {
            FoodsDto foodsDto = new FoodsDto();
            foodsDto.setId(food.id);
            foodsDto.setName(food.getName());

            Company company = food.getCompany();

            CompanyDto companyDto = new CompanyDto();

            companyDto.setCompanyImage(company.getCompanyImage());
            companyDto.setCompanyLogo(company.getCompanyLogo());
            companyDto.setCompanyName(company.getCompanyName());
            companyDto.setFoods(null);
            companyDto.setLocation(company.getLocation());
            companyDto.setScore(company.getScore());
            companyDto.setCategory(company.getCategory());

            foodsDto.setCompany(companyDto);

            List<String> allImages = new ArrayList<>();
            for (Images images : food.imagesList) {
                allImages.add(images.imageUrl);
            }

            foodsDto.setImages(allImages);
            foodsDtos.add(foodsDto);
        }
    return foodsDtos;

    }*/

    public boolean addFoodByCompanyId(FoodsDto foodsDto, Integer id, Integer categoryId) {

        Company company = companyRepository.findById(id);
        if (company != null) {
            Food food = new Food();
            food.setCompany(company);
            food.setName(foodsDto.getName());
            food.setDescription(foodsDto.getDescription());
            food.setFoodCategory(foodCategoryRepository.getCategoryById(categoryId));

            for (ImageDto imageDto : foodsDto.getImagesList()) {

                Images images = new Images();
                images.setImageUrl(imageDto.getUrl());
                images.setFoodImage(food);
                imagesRepository.persist(images);
                food.getImagesList().add(images);

            }

            company.getFoods().add(food);
            foodRepository.persist(food);
            companyRepository.persist(company);
            return true;
        } else return false;
    }

    @Override
    public List<CategoryDto> getAllFoodCategories() {
        return ObjectMapperUtils.mapAll(foodCategoryRepository.listAll(), CategoryDto.class);
    }
}
