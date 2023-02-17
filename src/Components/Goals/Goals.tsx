import React from "react";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { RootState } from "../../store";
import MedalIcon from "@mui/icons-material/WorkspacePremium";
import { Link } from "react-router-dom";

const Goals = () => {
  const goals = useSelector((state: RootState) => state.goals.goals);
  return (
    <Box>
      <Container sx={{ display: "flex", gap: "25px", marginTop: "20px" }}>
        {goals.flat(Infinity).map((goal) => {
          return (
            <Card
            key={`goal ${goal.id}`}
              sx={{ minWidth: 275 }}
              component={Link}
              to={`/home/single-goal/${goal.id}`}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <MedalIcon sx={{ fontSize: 200 }} />
                </Box>
                <Typography
                  sx={{ fontSize: 25, textAlign: "center" }}
                  color="white"
                >
                  {goal?.name ?? "Unnamed Goal"}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
};

export default Goals;
