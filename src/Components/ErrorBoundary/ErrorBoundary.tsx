import { Box } from "@mui/material";
import React from "react";
import errorBoundaryPNG from "../../resources/errorBoundaryPNG.png";

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
    >

    </Box>
  );
};

export default ErrorBoundary;
