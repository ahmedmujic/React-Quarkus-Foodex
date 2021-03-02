import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./companyManagement.css";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BusinessIcon from "@material-ui/icons/Business";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

export function CompanyManagement() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [open, setOpen] = useState(false);
  var companies = [];
  const actions = [{ icon: <BusinessIcon />, name: "Add company" }];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(cookies);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.userToken}`,
      },
    };
    fetch("http://127.0.0.1:8080/api/companies", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
      {companies.length === 0 ? (
        <div className="noContent">
          <SentimentVeryDissatisfiedIcon /> Nothing to show
        </div>
      ) : null}
    </div>
  );
}
