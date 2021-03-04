package ba.codecta.foodex.services.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FoodsDto {

    private String name;
    private List<ImageDto> imagesList;
    private String description;
    private CategoryDto foodCategory;

    public CategoryDto getFoodCategory() {
        return foodCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setFoodCategory(CategoryDto foodCategory) {
        this.foodCategory = foodCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ImageDto> getImagesList() {
        return imagesList;
    }

    public void setImagesList(List<ImageDto> imagesList) {
        this.imagesList = imagesList;
    }

}
