import React from "react";

import { AppBar, Toolbar, Typography, Box, Hidden } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Navbar(): JSX.Element {
  const location = useLocation();

  const NavLink = ({ path, label }: { path: string; label: string }) => (
    <Link
      style={{
        paddingLeft: "1rem",
        color: "white",
        textDecoration: location.pathname === path ? "underline" : "none",
      }}
      color="primary"
      to={path}
      relative="path"
    >
      {label}
    </Link>
  );

  return (
    <AppBar position="static">
      {/* <CssBaseline /> */}
      <Toolbar sx={{ backgroundColor: "#333" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Typography variant="h6">SFB</Typography>{" "}
            {/* TODO: Hide this if small screen */}
            <Hidden smDown>
              <Typography variant="subtitle2" marginLeft=".5rem">
                Säkra, Förvara, Beskydda
              </Typography>
            </Hidden>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <NavLink path="/" label="Om SFB"></NavLink>
            <NavLink path="/explore" label="Utforska"></NavLink>
            <NavLink path="/add" label="Lägg till"></NavLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
