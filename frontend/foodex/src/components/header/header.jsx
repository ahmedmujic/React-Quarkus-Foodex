import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
export function Header(props) {
  return (
    <AppBar position="static" className="navi">
      <Box ml={1}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <div className="d-flex row">
              <FastfoodIcon></FastfoodIcon>
              <Typography variant="h6">{props.title}</Typography>
            </div>

            <div>
              <Link to="/auth/login" color="inherit">
                Login
              </Link>
              <Link to="/auth/register" color="inherit">
                Register
              </Link>
            </div>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
