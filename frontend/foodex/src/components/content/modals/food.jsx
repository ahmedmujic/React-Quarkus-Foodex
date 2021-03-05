import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { UppyComponent } from "./../../uppy";
import { useCookies } from "react-cookie";
import { Emitter } from "../../../shared/Emitter";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Config } from "../../../shared/uppy-config";
import FormControl from "@material-ui/core/FormControl";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Editor } from "@tinymce/tinymce-react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "800px",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
  },
  modal: {},
}));

export function FoodModal(props) {
  const classes = useStyles();
  const [foodName, setFoodName] = useState("");
  const [foodImages, setFoodImages] = useState("");
  const [foodDescription, setFoodDescription] = useState();
  const [category, setCategory] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  function handleEditorChange(content, editor) {
    setFoodDescription(content);
    console.log("Content was updated:", content);
  }
  var config = Config(
    "Upload your company logo",
    1,
    "100%",
    200,
    "Upload your profile logo"
  );
  function handleFoodImagesUpload(imageUrl) {
    console.log("slike");
    setFoodImages(imageUrl);
  }

  function selectCategory(id) {
    setSelectedCategory(id);
  }
  useEffect(() => {
    Emitter.categories.subscribe((categories) => {
      console.log(categories);
      setCategory(categories);
    });
  }, []);
  function addFoodSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.userToken}`,
      },
      body: JSON.stringify({
        name: foodName,
        imagesList: foodImages,
        foodCategoryId: selectedCategory,
        description: foodDescription,
      }),
    };
    fetch(
      `http://localhost:8080/api/food/add/${selectedCompany}/${selectedCategory}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("proslo uslo");
        console.log(data);
        props.updateData();
        props.handleCloseModal();
      });
  }
  return (
    <div style={{ width: "700px" }}>
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
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <FastfoodIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add food
              </Typography>
              <form
                className={classes.form}
                onSubmit={(event) => {
                  addFoodSubmit(event);
                }}
              >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Food Name"
                  name="foodName"
                  margin="normal"
                  onChange={(event) => setFoodName(event.target.value)}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Categories
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                    }}
                  >
                    {category?.map((category) => {
                      return (
                        <MenuItem value={category.id} key={category.id}>
                          {category.category}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Companies
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCompany}
                    onChange={(event) => {
                      setSelectedCompany(event.target.value);
                    }}
                  >
                    {props.companies?.map((company) => {
                      return (
                        <MenuItem value={company.id} key={company.id}>
                          {company.companyName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
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
                </FormControl>
                <UppyComponent
                  config={config}
                  onFileUploadCompleted={handleFoodImagesUpload}
                ></UppyComponent>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Food
                </Button>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
