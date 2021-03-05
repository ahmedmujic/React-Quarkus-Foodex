import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../../../../assets/css/companyManagement.css";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BusinessIcon from "@material-ui/icons/Business";
import { CompanyModal } from "../../modals/company";
import { FoodModal } from "../../modals/food";
import { makeStyles } from "@material-ui/core/styles";
import { CompanyComponent } from "../../../companyComponent";
import Grid from "@material-ui/core/Grid";
import { Emitter } from "../../../../shared/Emitter";
import { companyService } from "../../../../shared/services/CompanyService";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [companies, setCompanies] = useState();
  const [open, setOpen] = useState(false);
  const [openFoodModal, setOpenFoodModal] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenFoodModal = () => {
    setOpenFoodModal(true);
  };

  const handleCloseFoodModal = () => {
    setOpenFoodModal(false);
  };
  const actions = [
    {
      icon: <BusinessIcon />,
      name: "Add company",
      action: handleOpenModal,
    },
    {
      icon: <FastfoodIcon />,
      name: "Add food to company",
      action: handleOpenFoodModal,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function updateData() {
    companyService.getUserCompanies(cookies.userToken).then((data) => {
      Emitter.usersCompanies.next(data);
      setCompanies(data);
    });
  }
  useEffect(() => {
    companyService.getUserCompanies(cookies.userToken).then((data) => {
      console.log(data);
      Emitter.usersCompanies.next(data);
      setCompanies(data);
    });
  }, []);

  return (
    <div>
      <CompanyModal
        open={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        updateData={updateData}
      ></CompanyModal>
      <FoodModal
        open={openFoodModal}
        handleOpenModal={handleOpenFoodModal}
        handleCloseModal={handleCloseFoodModal}
        updateData={updateData}
        companies={companies}
      ></FoodModal>

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
            onClick={action.action}
          />
        ))}
      </SpeedDial>
      {companies === undefined || companies.length === 0 ? (
        <div className="noContent">
          <SentimentVeryDissatisfiedIcon /> Nothing to show
        </div>
      ) : (
        <div className="company-container">
          <Grid container spacing={3} direction="row">
            {companies.map((company) => {
              return (
                <Grid key={company.id} item>
                  <CompanyComponent
                    description={company.description}
                    id={company.id}
                    logoUrl={company.companyLogo}
                    companyName={company.companyName}
                    companyImage={company.companyImage}
                    companyLocation={company.location}
                  ></CompanyComponent>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
}
