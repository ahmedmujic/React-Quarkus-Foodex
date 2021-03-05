import { Emitter } from "../shared/Emitter";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { companyService } from "../shared/services/CompanyService";
import { makeStyles } from "@material-ui/core/styles";
import patternImage from "../assets/images/pattern.jpg";
// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "../assets/css/companyInfo.css";
const useStyles = makeStyles((theme) => ({
  typo: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  images: {
    width: "100%",
    height: "100%",
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
    companyService.getCompanyByCompanyId(id).then((company) => {
      console.log(company);
      setSelectedCompany(company);
    });
  }, []);
  return (
    <div>
      <div
        className="banner d-flex justify-content-center"
        style={{ backgroundImage: `url(${selectedCompany?.companyImage})` }}
      ></div>
      <div>
        <div className="row">
          <div className="col-12  m-5 ">
            <div className="mt-2 pt-5">
              <div className="row mt-4 mb-4">
                {selectedCompany?.foods.map((food) => {
                  return (
                    <div className="col-6 row" key={food.name}>
                      <div className="col-6">
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
                      <div className="col-6">
                        <h1>{food.name}</h1>
                        <div>
                          <img
                            src={food.foodCategory.categoryImageUrl}
                            className={classes.icon}
                            alt="category img"
                          ></img>
                          <div
                            className="pt-3"
                            dangerouslySetInnerHTML={{
                              __html: food.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
