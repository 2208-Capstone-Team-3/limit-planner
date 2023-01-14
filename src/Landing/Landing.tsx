import React from "react";
import Box from "@mui/material/Box";
import "./landing.css";
import "animate.css";
import lightLogo from "../resources/logo.svg";
import darkLogo from "../resources/ad-logo.svg";
import useTheme from "@mui/material/styles/useTheme";
import { Button } from "@mui/material";
import lightBackground from "../resources/lightBackground.mp4";
import darkBackground from "../resources/darkBackground.mp4";

function Landing() {
  const theme = useTheme();

  const lightVideoComp = (
    <video
      className="background"
      autoPlay
      muted
      loop
      key={"lightBackground"}
      id="lightBackground"
      src={lightBackground}
    ></video>
  );

  const darkVideoComp = (
    <video
      className="background"
      autoPlay
      muted
      loop
      key={"darkBackground"}
      id="darkBackground"
      src={darkBackground}
    ></video>
  );

  return (
    <Box
      className={
        theme.palette.mode === "dark"
          ? "start-landing-dark"
          : "start-landing-light"
      }
      key={"landing-top-box"}
      minHeight="100vh"
      sx={{
        display: "flex",
        placeContent: "center center",
        placeItems: "center center",
        flexDirection: "column",
      }}
    >
      {theme.palette.mode === "dark" ? darkVideoComp : lightVideoComp}
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

export default Landing;
