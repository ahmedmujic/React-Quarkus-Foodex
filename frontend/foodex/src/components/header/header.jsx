import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";

import { usersService } from "../../shared/services/UserService";
export function Header(props) {
  const [user, setUser] = new useState();
  useEffect(() => {
    setUser(usersService.getUser());
  }, []);
  return (
    <AppBar position="static" className="navi">
      <Box ml={1}>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link to="/" className="linkDecor">
              <div className="d-flex row">
                <FastfoodIcon></FastfoodIcon>
                <Typography variant="h6">{props.title}</Typography>
              </div>
            </Link>
            <div className="d-flex align-items-center ">
              {user != null || user != undefined ? (
                <div className="row">
                  <h5 className="p-0 m-0">Wellcome {user.name}</h5>
                  <h5 className="p-0 m-0 pl-3 pointerHover">Logout </h5>
                </div>
              ) : (
                <div className="row">
                  <Link to="/auth/login" className="linkDecor">
                    <h6>Login</h6>
                  </Link>
                  <Link to="/auth/register" className="linkDecor">
                    <h6 className="pl-2">Register</h6>
                  </Link>
                </div>
              )}
            </div>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
