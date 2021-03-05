import { Emitter } from "../shared/Emitter";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Import Swiper React components
import parse from "html-react-parser";
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
  const [subscriptions, setSubscriptions] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    console.log("called");
    const subscription = Emitter.companies.subscribe((data) => {
      console.log("uslo");
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          console.log("pogodjeno");
          setSelectedCompany(data[i]);
        }
      }
    });
    setSubscriptions([...subscriptions, subscription]);
    return () => {
      subscriptions.forEach((subscription) => subscription);
    };
  }, []);
  return (
    <div>
      <div
        className="banner d-flex justify-content-center"
        style={{ backgroundImage: `url(${selectedCompany?.companyImage})` }}
      ></div>
      <div className="row">
        <div className="col-2">
          <div className="p-3">
            <h1 className="font-weight-bold">{selectedCompany?.companyName}</h1>
            <div
              className="pt-3"
              dangerouslySetInnerHTML={{ __html: selectedCompany?.description }}
            ></div>
          </div>
        </div>
        <div className="col-10">
          <div className="container mt-2 pt-5">
            {selectedCompany?.foods.map((food) => {
              return (
                <div className="row mt-4 mb-4" key={food.name}>
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
                      <div
                        className="pt-3"
                        dangerouslySetInnerHTML={{ __html: food.description }}
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
  );
}
