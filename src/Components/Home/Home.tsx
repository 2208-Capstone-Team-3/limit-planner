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
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import LimitAppBar from "../AppBar/AppBar";
import MedalIcon from '@mui/icons-material/WorkspacePremium';
import Calendar from "./Calendar";

const Home = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  return (
    <Box>
      <LimitAppBar />
        <Drawer
          variant="permanent"
          open={open}
          anchor="left"
          key={"navDrawer"}
          style={{ zIndex: 5, position: "sticky" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer} style={{ position: "sticky" }}>
              {open ? <ChevronLeft /> : <ChevronRight />}
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
          <Toolbar />
          <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
