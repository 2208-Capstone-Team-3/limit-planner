import React, {
  BaseSyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Switch, useTheme } from "@mui/material";
import { ColorModeContext } from "../../App";

import Logo from "../../resources/logo.svg";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const LoginPage = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev: BaseSyntheticEvent) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const loginWithToken = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/auth", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(response.data));

        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, navigate]);

  const attemptLogin = async (event: BaseSyntheticEvent) => {
    try {
      event.preventDefault();
      const normalizeCredentials = {
        ...credentials,
        username: credentials.username.toLowerCase(),
      };
      const response = await axios.post("/api/auth", normalizeCredentials);
      const token = response.data;
      window.localStorage.setItem("token", token);

      loginWithToken();
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.localStorage.getItem("token") && loginWithToken();
  });

  return (
    <Box>
              <Link sx={{position: "absolute"}} aria-label="Link back to Limit Landing page" href="/">
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
        <Switch
        sx={{ position: "absolute", zIndex: 6, right: "1vw", top: "1vw" }}
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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            placeSelf: "center center",
            placeItems: "center center",
            placeContent: "center center",
            position: "relative",
            top: "15vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.secondary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={attemptLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              value={credentials.password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/createuser" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
