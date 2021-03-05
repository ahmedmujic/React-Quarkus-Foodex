package ba.codecta.foodex.services.model;

public class ImageDto {
    private String url;

    public ImageDto(String url) {
        this.url = url;
    }

    public ImageDto(){

    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
