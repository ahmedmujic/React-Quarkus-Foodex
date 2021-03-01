package ba.codecta.foodex.services.impl;

import ba.codecta.foodex.helpers.ArrayMapper;
import ba.codecta.foodex.helpers.ObjectMapperUtils;
import ba.codecta.foodex.repository.CompanyRepository;
import ba.codecta.foodex.repository.UserRepository;
import ba.codecta.foodex.repository.entity.Company;
import ba.codecta.foodex.repository.entity.Food;
import ba.codecta.foodex.repository.entity.Images;
import ba.codecta.foodex.repository.entity.UserEntity;
import ba.codecta.foodex.services.CompanyService;
import ba.codecta.foodex.services.model.CompanyDto;
import ba.codecta.foodex.services.model.FoodsDto;
import ba.codecta.foodex.services.model.ImageDto;
import org.modelmapper.ModelMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Transactional
public class CompanyServiceImpl implements CompanyService {

    private static ModelMapper modelMapper = new ModelMapper();
    @Inject
    CompanyRepository companyRepository;

    @Inject
    UserRepository userRepository;

    @Override
    public List<CompanyDto> getAllCompanies() {
        List<Company> companies = companyRepository.listAll();


        List<CompanyDto> companyDtos = new ArrayList<>();

        for (Company company : companies) {

            CompanyDto companyDto = new CompanyDto();
            companyDto.setCompanyName(company.getCompanyName());
            companyDto.setCompanyImage(companyDto.getCompanyImage());
            companyDto.setCompanyLogo(companyDto.getCompanyLogo());
            companyDto.setLocation(company.getLocation());
            companyDto.setId(company.getId());
            companyDto.setScore(company.getScore());
            companyDto.setCategory(company.getCategory());

            List<FoodsDto> foodsDtods = new ArrayList<>();
            for (Food foodCompany : company.getFoods()) {
                FoodsDto foodsDto = new FoodsDto();

                List<ImageDto> imageDtos = new ArrayList<>();

                foodsDto.setName(foodCompany.getName());
                for (Images images : foodCompany.imagesList) {
                    ImageDto imageDto = new ImageDto(images.imageUrl);
                    imageDtos.add(imageDto);
                }

                foodsDto.setImagesList(imageDtos);
                foodsDtods.add(foodsDto);
            }

            companyDto.getFoods().addAll(foodsDtods);
            companyDtos.add(companyDto);

        }

        return companyDtos;

    }

    @Override
    public CompanyDto addCompany(CompanyDto companyDto, String userEmail) {
        UserEntity userEntity = userRepository.findByEmail(userEmail);
        if (userEntity != null) {
            Company company = modelMapper.map(companyDto, Company.class);
            company.setUser(userEntity);
            companyRepository.persist(company);
            return companyDto;
        } else {
            return null;
        }

    }

    @Override
    public boolean editCompany(CompanyDto companyDto) {
        Company company = companyRepository.findById(companyDto.getId());
        if (company != null) {
            company.setCompanyName(companyDto.getCompanyName());
            company.setCompanyImage(companyDto.getCompanyImage());
            company.setCompanyLogo(companyDto.getCompanyLogo());
            company.setLocation(companyDto.getLocation());
            company.setScore(companyDto.getScore());
            company.setCategory(companyDto.getCategory());

            List<Food> foods = new ArrayList<>();
            for (FoodsDto foodCompany : companyDto.getFoods()) {
                Food foodsEnty = new Food();

                List<Images> imagesEnty = new ArrayList<>();

                foodsEnty.setName(foodCompany.getName());
                for (ImageDto images : foodCompany.getImagesList()) {
                    Images image = new Images();
                    image.setImageUrl(images.getUrl());
                    imagesEnty.add(image);
                }
                foods.add(foodsEnty);
            }
        }
        companyRepository.persist(company);
        return true;
    }
}
