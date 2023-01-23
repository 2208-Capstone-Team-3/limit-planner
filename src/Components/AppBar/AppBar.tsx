import React, { BaseSyntheticEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { resetUser } from "../../store/userSlice";
import { useTheme } from "@mui/material";
import lightLogo from "../../resources/LimitName.svg";
import darkLogo from "../../resources/ad-logo.svg";
import { ColorModeContext } from "../../App";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function LimitAppBar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const { user }: any = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const userSettings = ["Account", "Goals", "Logout"];
  const guestSettings = ["Login"];

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate("/");
    window.location.reload();
  };

  const login = () => {
    navigate("/login");
  };
  const navDashboard = () => {
    navigate("/home");
  };
  const navUserAccount = () => {
    navigate("/account");
  };
  const navUserGoals = () => {
    navigate("/goals");
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event: BaseSyntheticEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (e.target.innerHTML === "Logout" || e.target.id === "Logout") logout();
    if (e.target.innerHTML === "Login" || e.target.id === "Login") login();
    if (e.target.innerHTML === "Dashboard" || e.target.id === "Dashboard")
      navDashboard();
    if (e.target.innerHTML === "Account" || e.target.id === "Account")
      navUserAccount();
    if (e.target.innerHTML === "Goals" || e.target.id === "Goals")
      navUserGoals();
    setAnchorElUser(null);
  };
  console.log(user)

  return (
    <AppBar
      color="primary"
      sx={{ display: "flex", height: "10vh", placeContent: "center" }}
      position="fixed"
    >
      <Box sx={{ display: "flex", ml: "1vw", width: "100vw" }}>
        <Link href="/home">
          <Avatar
            variant="square"
            src={theme.palette.mode === "light" ? lightLogo : darkLogo}
            sx={{
              mr: 10,
              height: "6vh",
              width: "auto",
            }}
          ></Avatar>
        </Link>
        <Box
          sx={{
            mr: 5,
            display: "flex",
            placeSelf: "center",
            placeItems: "center",
            width: "25%",
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.fullName ?? "Guest"} src={user.avatarUrl} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "6vh" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user.id
              ? userSettings.map((setting) => (
                  <MenuItem
                    id={setting}
                    value={setting}
                    key={setting}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              : guestSettings.map((setting) => (
                  <MenuItem
                    id={setting}
                    value={setting}
                    key={setting}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
          </Menu>
          {user.username ? (
            <Typography color={"white"} sx={{ ml: 1 }}>
              {`Welcome, ${user.username}!`}
            </Typography>
          ) : (
            <Link href="/login">
              <Typography color="white" sx={{ ml: 1 }}>
                Sign-in
              </Typography>
            </Link>
          )}
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
}
export default LimitAppBar;