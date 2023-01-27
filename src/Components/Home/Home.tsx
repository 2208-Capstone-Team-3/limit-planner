import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  Dashboard,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LimitAppBar from "../AppBar/AppBar";
import MedalIcon from "@mui/icons-material/WorkspacePremium";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setHomeDrawerOpen } from "../../store/themeSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  const homeDrawerOpen: boolean = useSelector(
    (state: RootState) => state.theme.theme.homeDrawerOpen
  );

  const toggleDrawer = (): void => {
    dispatch(setHomeDrawerOpen(!homeDrawerOpen));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LimitAppBar />
      <Drawer
        variant="persistent"
        open={homeDrawerOpen}
        anchor="left"
        key={"navDrawer"}
        sx={{ position: "sticky", top: "10vh" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            mt: "10vh",
          }}
        >
          <Typography variant="button">Collapse</Typography>
          <IconButton onClick={toggleDrawer} style={{ position: "sticky" }}>
            {homeDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton href="/home">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton href="/charts">
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Advanced Charts" />
          </ListItemButton>
          <ListItemButton href="/goals">
            <ListItemIcon>
              <MedalIcon />
            </ListItemIcon>
            <ListItemText primary="Goals" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
