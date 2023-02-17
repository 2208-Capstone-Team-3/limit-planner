import { Container, Typography } from "@mui/material";
import React from "react";
import countingMoney from "../../resources/countingMoney.gif";

const SingleGoal = () => {
  return (
    <Container
      sx={{
        display: "flex",
        placeItems: "center center",
        height: "90vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2">Make all the money</Typography>
      <Container
        sx={{ display: "flex", placeContent: "center center", height: "90vh" }}
      >
        <img alt="Make all the money like scrooge mcduck" src={countingMoney} />
      </Container>
    </Container>
  );
};

export default SingleGoal;
