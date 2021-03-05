import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import "../../assets/css/home.css";
import { Link } from "react-router-dom";
import hamburgerImage from "../../assets/images/hamburgerDrawing.svg";
import card1 from "../../assets/images/card1Chef.jpg";
import card2 from "../../assets/images/meat.jpg";
import card3 from "../../assets/images/ingredients.jpg";
import { useContext, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary,
  },
  media: {
    height: 140,
  },
}));

export function Home(props) {
  const cards = [
    {
      image: card1,
      title: "Lorem, ipsum dolo1.",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, quisquam.",
    },
    {
      image: card2,
      title: "Lorem, ipsum dolor2.",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, quisquam.",
    },
    {
      image: card3,
      title: "Lorem, ipsum dolo3.",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, quisquam.",
    },
  ];
  const classes = useStyles();

  return (
    <div>
      {/* wellcome message */}
      <Box className={classes.root} m={2} height={"100vh"}>
        <Grid container direction="row" className="h-100">
          <Grid
            item
            lg={6}
            md={6}
            sd={12}
            xs={12}
            className="d-flex justify-content-center align-items-center"
          >
            <Box>
              <Box
                fontWeight="fontWeightBold"
                fontSize="h2.fontSize"
                color="primary.main"
              >
                FoodEx
              </Box>
              <Box
                fontWeight="fontWeightLight"
                fontSize="h5.fontSize"
                color="text.secondary"
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
                possimus.
              </Box>
              <Link to="/companies">
                <Button
                  variant="outlined"
                  color="primary"
                  className="mt-2 exploreButton"
                >
                  Explore
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sd={12}
            xs={12}
            className="d-flex justify-content-center align-items-center "
          >
            <img
              src={hamburgerImage}
              alt="not available"
              className="w-100"
            ></img>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid
          item
          lg={12}
          md={12}
          sd={12}
          xs={12}
          className="d-flex justify-content-center"
        >
          <div>
            <Box
              fontWeight="fontWeightBold"
              fontSize="h2.fontSize"
              color="primary.main"
            >
              Lorem, ipsum dolor.
            </Box>
            <Box
              fontWeight="fontWeightLight"
              fontSize="h5.fontSize"
              color="text.secondary"
              textAlign="center"
            >
              Lorem, ipsum dolor.
            </Box>
            <hr className="underline"></hr>
          </div>
        </Grid>

        <Grid
          className="grid-margin"
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {cards.map((card) => (
            <Grid item lg={4} md={4} sd={4} xs={4} key={card.title}>
              <Box display="flex" justifyContent="center">
                <Card className="card-width w-100">
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={card.image}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
