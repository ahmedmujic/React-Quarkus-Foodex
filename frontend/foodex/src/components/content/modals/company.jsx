import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { companyService } from "../../../shared/services/CompanyService";
import Container from "@material-ui/core/Container";
import BusinessIcon from "@material-ui/icons/Business";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { UppyComponent } from "./../../uppy";
import { useCookies } from "react-cookie";
import { Editor } from "@tinymce/tinymce-react";

import { Config } from "../../../shared/uppy-config";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    color: theme.palette.secondary.main,
    backgroundColor: "white",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingBlock: 50,
  },
  location: {
    width: "50%",
  },
}));
const mapStyles = {
  width: "100%",
  height: "100%",
};
export function CompanyModal(props) {
  const classes = useStyles();
  const [companyName, setCompanyName] = useState("");
  const [companyLatitudeLocation, setCompanyLatitude] = useState("");
  const [companyLongitudeLocation, setCompanyLongitude] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [companyDescription, setCompanyDescription] = useState();
  const [companyCategory, setCompanyCategory] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  function handleEditorChange(content, editor) {
    setCompanyDescription(content);
  }

  var config = Config(
    "Upload your company logo",
    1,
    "100%",
    200,
    "Upload your profile logo"
  );
  function handleIconUpload(imageUrl) {
    console.log("slike");
    setCompanyLogo(imageUrl[0]);
  }
  function handlePictureUpload(imageUrl) {
    console.log("naslovna:" + imageUrl[0]);
    setCompanyImage(imageUrl[0]);
  }

  function addCompanySubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    companyService
      .addCompany(
        companyName,
        companyLatitudeLocation,
        companyLongitudeLocation,
        companyLogo,
        companyImage,
        companyDescription,
        cookies.userToken
      )
      .then((data) => {
        console.log(data);
        props.updateData();
        props.handleCloseModal();
      });
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <BusinessIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add company
              </Typography>
              <form
                className={classes.form}
                onSubmit={(event) => {
                  addCompanySubmit(event);
                }}
              >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  margin="normal"
                  onChange={(event) => setCompanyName(event.target.value)}
                />
                <div>
                  <TextField
                    variant="outlined"
                    required
                    label="Company Latitude"
                    className={classes.location}
                    name="companyLatitudeLocation"
                    margin="normal"
                    onChange={(event) => setCompanyLatitude(event.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    required
                    className={classes.location}
                    label="Company Longitude"
                    name="companyLongitudeLocation"
                    margin="normal"
                    onChange={(event) =>
                      setCompanyLongitude(event.target.value)
                    }
                  />
                </div>

                <Editor
                  initialValue="<p>Describe your company</p>"
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={handleEditorChange}
                />

                <UppyComponent
                  config={config}
                  onFileUploadCompleted={handleIconUpload}
                ></UppyComponent>

                <UppyComponent
                  config={config}
                  onFileUploadCompleted={handlePictureUpload}
                ></UppyComponent>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Company
                </Button>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
