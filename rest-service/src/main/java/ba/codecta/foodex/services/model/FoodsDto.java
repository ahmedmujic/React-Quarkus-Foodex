package ba.codecta.foodex.services.model;

import java.util.List;

public class FoodsDto {

    private String name;
    private List<ImageDto> imagesList;





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
