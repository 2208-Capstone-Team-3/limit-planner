import React, {
  BaseSyntheticEvent,
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
import { IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../../App";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const LoginPage = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (ev: BaseSyntheticEvent) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const loginWithToken = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/auth", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setUser(response.data));

        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.localStorage.getItem("token") && loginWithToken();
  }, [loginWithToken]);

  return (
    <Box>
      <IconButton
        sx={{ position: "absolute", zIndex: 6, left: "1vw", top: "1vw" }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
              control={<Checkbox value="remember" color="primary" />}
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
