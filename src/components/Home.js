import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { auth } from "../services/firebase";
import Songs from "./Songs";

const Home = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          Songs
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {user.displayName || user.email}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <br />
      <Songs />
    </div>
  );
};

export default Home;
