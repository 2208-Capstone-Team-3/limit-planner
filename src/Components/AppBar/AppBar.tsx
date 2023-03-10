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
import { resetUser, userInitialStateType } from "../../store/userSlice";
import {
  Button,
  ButtonGroup,
  Divider,
  Fade,
  Paper,
  Popper,
  Switch,
  useTheme,
} from "@mui/material";
import lightLogo from "../../resources/LimitName.svg";
import darkLogo from "../../resources/ad-logo.svg";
import icarusLogo from "../../resources/logo.svg";
import { ColorModeContext } from "../../App";
import MenuIcon from "@mui/icons-material/Menu";
import { setHomeDrawerOpen } from "../../store/themeSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

function LimitAppBar() {
  const homeDrawerOpen: boolean = useSelector(
    (state: RootState) => state.theme.theme.homeDrawerOpen
  );
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const { user }: userInitialStateType = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const userSettings = ["Account", "Subscription", "Logout"];
  const guestSettings = ["Login"];

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    navigate("/");
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
  const navUserSubscription = () => {
    navigate("/subscription");
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
    if (e.target.innerHTML === "Subscription" || e.target.id === "Subscription")
      navUserSubscription();
    setAnchorElUser(null);
  };

  return (
    <AppBar
      color="primary"
      sx={{ display: "flex", height: "10vh", placeContent: "center" }}
      position="fixed"
      variant="outlined"
      elevation={0}
    >
      <Box sx={{ display: "flex", ml: "1vw", width: "100%" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(setHomeDrawerOpen(!homeDrawerOpen))}
          edge="start"
          sx={{ mr: 2, ...(homeDrawerOpen && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/home">
          <Avatar
            alt="Limit Logo"
            variant="square"
            src={theme.palette.mode === "light" ? lightLogo : darkLogo}
            sx={{
              mr: 10,
              height: "9vh",
              width: "max-content",
            }}
          ></Avatar>
        </Link>
        <Box
          sx={{
            mr: 5,
            display: "flex",
            placeSelf: "center",
            placeItems: "center",
            width: "90%",
            placeContent: "end",
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user?.fullName ?? "Guest"}
                src={user?.avatarUrl ?? icarusLogo}
              />
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
            <MenuItem>
              <Switch
                sx={{ backgroundColor: "inherit" }}
                checked={theme.palette.mode === "light"}
                icon={
                  <DarkModeIcon
                    sx={{ backgroundColor: "black", borderRadius: "50%" }}
                    color="inherit"
                  />
                }
                checkedIcon={
                  <LightModeIcon
                    sx={{ backgroundColor: "white", borderRadius: "50%" }}
                    color="primary"
                  />
                }
                key={"switcher"}
                onClick={colorMode.toggleColorMode}
              />
              <Typography
                key={"ColorModeSwitchText"}
                className="ColorModeSwitchText"
              >
                {theme.palette.mode === "light" ? "Light" : "Dark"}
              </Typography>
            </MenuItem>
          </Menu>
          {user.firstName ? (
            <Typography color={"white"} sx={{ ml: 1 }}>
              {`Welcome, ${user.firstName}!`}
            </Typography>
          ) : (
            <Link href="/login">
              <Typography color="white" sx={{ ml: 1 }}>
                Sign-in
              </Typography>
            </Link>
          )}
        </Box>
        <Divider orientation="vertical" sx={{ padding: 1 }} />
        <Box
          sx={{ display: "flex", placeItems: "center" }}
          paddingRight={3}
          paddingLeft={2}
        >
          <PopupState variant="popover" popupId="addNewDataPopUp">
            {(popupState) => (
              <Box>
                <IconButton {...bindToggle(popupState)}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Popper
                  {...bindPopper(popupState)}
                  transition
                  sx={{ paddingTop: 2 }}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={450}>
                      <Paper>
                        <ButtonGroup orientation="vertical">
                          <Button href="/home/newaccount" variant="contained" >New Account</Button>
                          <Button href="/home/accounts" variant="contained" >New Goal</Button>
                          <Button href="/home/accounts" variant="contained" >New Entry</Button>
                        </ButtonGroup>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>
            )}
          </PopupState>
        </Box>
      </Box>
    </AppBar>
  );
}
export default LimitAppBar;
