import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { usersService } from "../../../../shared/services/UserService";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Register() {
  let history = useHistory();
  let [username, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [usernameError, setUsernameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [confirmPasswordError, setconfirmPasswordError] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function validateForm() {
    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var valid = true;
    var usernameError = "";
    var emailError = "";
    var passwordError = "";
    var confirmPasswordError = "";

    if (username.length < 3) {
      usernameError = "Username must be at least 3 charachters long";
      valid = false;
    }
    if (!emailRe.test(String(email).toLowerCase())) {
      emailError = "Email is not valid";
      valid = false;
    }
    if (!passRe.test(String(password).toLowerCase())) {
      passwordError =
        "Password must have minimum eight characters, at least one letter and one number:";
      valid = false;
    }
    if (!passRe.test(String(confirmPassword).toLowerCase())) {
      confirmPasswordError =
        "Password must have minimum eight characters, at least one letter and one number:";
      valid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordError = "Passwords did not match";
      valid = false;
    }

    setPasswordError(passwordError);
    setEmailError(emailError);
    setUsernameError(usernameError);
    setconfirmPasswordError(confirmPasswordError);
    return valid;
  }

  function submitForm(e) {
    e.stopPropagation();
    e.preventDefault();

    if (validateForm()) {
      usersService.register(email, password, username).then((response) => {
        if (response.status === 200) {
          history.push("/auth/login");
        } else if (response.status === 409) {
          setOpen(true);
          setErrorMessage("User already exists");
        } else {
          setErrorMessage("Server error");
        }
      });
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={(event) => {
              submitForm(event);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {usernameError !== "" ? (
                  <TextField
                    error
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Username"
                    name="username"
                    helperText={usernameError}
                    variant="outlined"
                    onChange={(event) => setName(event.target.value)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    onChange={(event) => setName(event.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {emailError !== "" ? (
                  <TextField
                    error
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Email"
                    name="email"
                    helperText={emailError}
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {passwordError !== "" ? (
                  <TextField
                    error
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Password"
                    helperText={passwordError}
                    variant="outlined"
                    name="password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {confirmPasswordError !== "" ? (
                  <TextField
                    error
                    fullWidth
                    id="outlined-error-helper-text"
                    label="Confirm password"
                    helperText={confirmPasswordError}
                    variant="outlined"
                    name="confirmPassword"
                    type="password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    id="password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree with terms and conditions"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
