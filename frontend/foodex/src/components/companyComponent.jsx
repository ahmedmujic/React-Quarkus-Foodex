import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    minWidth: 350,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarImage: {
    width: "40px",
    height: "40px",
  },
}));

export function CompanyComponent(props) {
  let history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [mapLink, setMapLink] = useState();

  const handleExpandClick = () => {
    console.log(mapLink);
    console.log(props.companyLocation);

    console.log(mapLink);
    setExpanded(!expanded);
  };

  useEffect(() => {
    setMapLink(
      `https://maps.google.com/maps?q=${props.companyLocation}&z=15&output=embed`
    );
  }, []);
  return (
    <Card className={classes.root}>
      <Link to={`/company/${props.id}`}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img
                src={props.logoUrl}
                alt="Not available"
                className={classes.avatarImage}
              ></img>
            </Avatar>
          }
          title={props.companyName}
        />
      </Link>
      <CardMedia className={classes.media} image={props.companyImage} />
      <CardContent>
        <div
          className="pt-3"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {mapLink != null || mapLink != undefined ? (
            <div>
              <iframe
                title="Company location"
                width="100%"
                height="300"
                scrolling="no"
                src={mapLink}
              ></iframe>
              <a href="https://www.maps.ie/route-planner.htm">
                Road Trip Planner
              </a>
            </div>
          ) : null}

          {/* <iframe
            title="Company Location"
            src={`https://maps.google.com/maps?q=44.22630834795185,17.90993408282895&hl=es;z=14&amp;output=embed`}
          ></iframe> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
