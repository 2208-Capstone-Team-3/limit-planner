import React from "react";
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
import { Outlet } from "react-router-dom";
import LimitAppBar from "../AppBar/AppBar";
import MedalIcon from "@mui/icons-material/WorkspacePremium";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setHomeDrawerOpen } from "../../store/themeSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const homeDrawerOpen: boolean = useSelector(
    (state: RootState) => state.theme.theme.homeDrawerOpen
  );

  const toggleDrawer = (): void => {
    dispatch(setHomeDrawerOpen(!homeDrawerOpen));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
          <IconButton
            aria-label="Navigation Drawer Open or Close"
            onClick={toggleDrawer}
            style={{ position: "sticky" }}
          >
            {homeDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" sx={{height: "50vh"}}>
          <ListItemButton href="/home">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton href="/home/advancedcharts">
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Advanced Charts" />
          </ListItemButton>
          <ListItemButton href="/home/goals">
            <ListItemIcon>
              <MedalIcon />
            </ListItemIcon>
            <ListItemText primary="Goals" />
          </ListItemButton>
          <ListItemButton href="/home/accounts">
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          mt: "10vh",
          ml: () => (homeDrawerOpen ? "14vw" : "0vw"),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
