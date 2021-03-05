import { useEffect, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { User } from "../../../../shared/models/User";
import { usersService } from "../../../../shared/services/UserService";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Login() {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [open, setOpen] = useState(false);

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
    var emailError = "";
    var passwordError = "";
    if (!emailRe.test(String(email).toLowerCase())) {
      emailError = "Email is not valid";
      valid = false;
    }
    if (!passRe.test(String(password).toLowerCase())) {
      passwordError =
        "Password must have minimum eight characters, at least one letter and one number:";
      valid = false;
    }
    setPasswordError(passwordError);
    setEmailError(emailError);
    return valid;
  }
  function submitForm(e) {
    e.stopPropagation();
    e.preventDefault();
    if (validateForm()) {
      usersService
        .login(email, password)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 401) {
            setOpen(true);
            return setErrorMessage("Wrong email or password");
          } else {
            setOpen(true);
            return setErrorMessage("Internal server error");
          }
        })
        .then((data) => {
          if (data != null || data != undefined) {
            var user = new User(data.id, data.email, data.username);
            usersService.setUser(user);
            setCookie("userToken", data.token, { path: "/" });
            history.push("/dashboard");
          }
        });
    }
  }
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={(event) => {
              submitForm(event);
            }}
          >
            {emailError !== "" ? (
              <TextField
                error
                fullWidth
                id="outlined-error-helper-text"
                label="Email"
                name="email"
                helperText={emailError}
                variant="outlined"
                margin="normal"
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
                margin="normal"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            )}
            {passwordError !== "" ? (
              <TextField
                error
                fullWidth
                margin="normal"
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
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
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
