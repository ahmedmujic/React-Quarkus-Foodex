import { Emitter } from "../shared/Emitter";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "./companyInfo.css";
const useStyles = makeStyles((theme) => ({
  typo: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  images: {
    width: "100%",
  },
  icon: {
    width: "40px",
    height: "40px",
  },
}));

export function CompanyInfo(props) {
  const classes = useStyles();
  const [selectedCompany, setSelectedCompany] = useState();
  let { id } = useParams();

  useEffect(() => {
    Emitter.companies.subscribe((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          console.log("pogodjeno");
          setSelectedCompany(data[i]);
        }
      }
    });
  }, [selectedCompany]);
  return (
    <div>
      <div
        className="banner d-flex justify-content-center"
        style={{ backgroundImage: `url(${selectedCompany?.companyImage})` }}
      >
        <div className="company-info d-flex  align-items-end">
          <Typography variant="h3" component="h2" className={classes.typo}>
            {selectedCompany?.companyName}
          </Typography>
        </div>
      </div>

      <div className="container mt-2 pt-5">
        {selectedCompany?.foods.map((food) => {
          return (
            <div className="row" key={food.name}>
              <div className="col-5">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {food?.imagesList.map((image) => {
                    return (
                      <SwiperSlide key={image.url}>
                        <img
                          className={classes.images}
                          src={image.url}
                          alt="alt"
                        ></img>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="col-7">
                <h1>{food.name}</h1>
                <div>
                  <img
                    src={food.foodCategory.categoryImageUrl}
                    className={classes.icon}
                    alt="category img"
                  ></img>
                  <p className="pt-3">
                    Method: Heat 1/2 cup of the broth in a pot until simmering,
                    add saffron and set aside for 10 minutes. Heat oil in a (14-
                    to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook,
                    stirring occasionally until lightly browned, 6 to 8 minutes.
                    Transfer shrimp to a large plate and set aside, leaving
                    chicken and chorizo in the pan. Add pimentón, bay leaves,
                    garlic, tomatoes, onion, salt and pepper, and cook, stirring
                    often until thickened and fragrant, about 10 minutes. Set
                    aside off of the heat to let rest for 10 minutes, and then
                    serve.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
