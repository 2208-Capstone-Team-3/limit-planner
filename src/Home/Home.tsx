import React from "react";
import Box from "@mui/material/Box";
import "./home.css";
import "animate.css";
import lightLogo from "../resources/logo.svg";
import darkLogo from "../resources/ad-logo.svg";
import useTheme from "@mui/material/styles/useTheme";
import { Button } from "@mui/material";

function Home() {
  const theme = useTheme();

  return (
    <Box
      className={
        theme.palette.mode === "dark" ? "start-home-dark" : "start-home-light"
      }
      key={"home-top-box"}
      minHeight="100vh"
      sx={{
        display: "flex",
        placeContent: "center center",
        placeItems: "center center",
        flexDirection: "column",
      }}
    >
      <img
        id="logo"
        className={"animate__bounce"}
        src={theme.palette.mode === "dark" ? darkLogo : lightLogo}
        alt="Limit Icarus over sun backdrop"
      />
      <Button variant="contained" sx={{ position: "fixed", bottom: 50 }}>
        Sign Up
      </Button>
    </Box>
  );
}

export default Home;
