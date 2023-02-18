import { Avatar, Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import errorBoundaryPNG from "../../resources/errorBoundaryPNG.png";
import Logo from "../../resources/logo.svg";
import "./errorBoundary.css";

const ErrorBoundary = () => {
  return (
    <Box
      display={"flex"}
      minHeight="100vh"
      maxHeight="100vh"
      sx={{
        backgroundImage: `url(${errorBoundaryPNG})`,
        backgroundSize: "cover",
      }}
      component={"main"}
    >
      <Link
        aria-label="Link back to Limit Landing page"
        href="/"
      >
        <Avatar
          role={"navigation"}
          alt="Limit Logo"
          variant="square"
          sx={{
            mr: 10,
            height: "20vh",
            width: "max-content",
            padding: 1,
          }}
          src={Logo}
        ></Avatar>
      </Link>
      <Container className="visually-hidden">
        <Typography variant="h1" key={"ErrorBoundary Message"}>
          This page does not exist or has encountered a fatal error. Please
          return to our home page!
        </Typography>
      </Container>
    </Box>
  );
};

export default ErrorBoundary;
