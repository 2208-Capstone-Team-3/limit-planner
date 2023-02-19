import React, { useCallback, useContext, useEffect } from "react";
import "./landing.css";
import "animate.css";
import lightLogo from "../../resources/logo.svg";
import darkLogo from "../../resources/ad-logo.svg";
import { useTheme } from "@mui/material/styles/";
import {
  Box,
  Button,
  Container,
  Divider,
  Grow,
  Paper,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import lightBackground from "../../resources/lightBackground.mp4";
import darkBackground from "../../resources/darkBackground.mp4";
import summitWoman from "../../resources/summitWoman.jpeg";
import growMoney from "../../resources/growMoney.jpeg";
import techBackground from "../../resources/techBackground.png";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Mousewheel,
  EffectFade,
  Keyboard,
  Navigation,
  Lazy,
  A11y,
} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material/";
import { ColorModeContext } from "../../App";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../store/userSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MainLineChart from "../Charts/MainLineChart";
import ExampleLineChart from "./ExampleCharts/ExampleLineChart";
import ExampleGoalChart from "./ExampleCharts/ExampleGoalChart";
import ExampleProjections from "./ExampleCharts/ExampleProjections";

function usePhotometer<Type>(lightRet: Type, darkRet: Type): Type {
  const theme = useTheme();
  const colorMode: string = theme.palette.mode;
  return colorMode === "light" ? lightRet : darkRet;
}

function Landing() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);

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

  const lightVideoComp = (
    <video
      className="background"
      autoPlay
      muted
      loop
      key={"lightBackground"}
      id="lightBackground"
      src={lightBackground}
    ></video>
  );

  const darkVideoComp = (
    <video
      className="background"
      autoPlay
      muted
      loop
      key={"darkBackground"}
      id="darkBackground"
      src={darkBackground}
    ></video>
  );

  useEffect(() => {
    loginWithToken();
  }, [loginWithToken]);

  return (
    <Box>
      <Switch
        sx={{ position: "absolute", zIndex: 6, left: "1vw", top: "1vw" }}
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
        key={"colorSwitcher"}
        onClick={colorMode.toggleColorMode}
      />
      <Box
        gap={1}
        sx={{
          display: "flex",
          ml: 1,
          position: "absolute",
          zIndex: 6,
          right: "2vw",
          top: "2vw",
        }}
      >
        <Button color="primary" href="createuser" variant="contained">
          <Typography variant="button">Sign-up</Typography>
        </Button>
        <Button variant="contained" href="login" color="primary">
          <Typography variant="button">Login</Typography>
        </Button>
      </Box>
      <Swiper
        modules={[Mousewheel, EffectFade, Keyboard, Navigation, Lazy, A11y]}
        direction="vertical"
        keyboard
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        fadeEffect={{ crossFade: true }}
        mousewheel={{ thresholdDelta: 20 }}
        effect="fade"
        key="swiperGroup"
        autoHeight
        roundLengths
        speed={600}
        createElements
        a11y={{ enabled: true }}
        lazy

      >
        <SwiperSlide tabIndex={0} key="slide1">
          <Box
            key={"landing-top-box"}
            minHeight="100vh"
            maxHeight="100vh"
            sx={{
              display: "flex",
              flexDirection: "column",
              placeContent: "center center",
              placeItems: "center center",
            }}
          >
            {usePhotometer(lightVideoComp, darkVideoComp)}
            <img
              id="logo"
              src={usePhotometer(lightLogo, darkLogo)}
              alt="Limit Icarus over sun backdrop"
            />
            <Box
              sx={{
                position: "fixed",
                top: "90vh",
              }}
            >
              <Tooltip
                title="Click Here to Learn More!"
                describeChild
                arrow
                TransitionComponent={Grow}
                TransitionProps={{ appear: true, timeout: 600 }}
              >
                <KeyboardArrowDown
                  className="swiper-button-next animate__animated animate__heartBeat animate__infinite"
                  sx={{
                    fontSize: "10vh",
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </SwiperSlide>
        <SwiperSlide tabIndex={1} key="slide2">
          {({ isActive }) => (
            <Box
              key={"landing-second-box"}
              minHeight="100vh"
              maxHeight="100vh"
              sx={{
                display: "flex",
                flexDirection: "row",
                placeContent: "center center",
                placeItems: "center center",
                backgroundImage: `url(${summitWoman})`,
                backgroundSize: "cover",
              }}
            >
              <KeyboardArrowUp
                className="swiper-button-prev"
                sx={{
                  fontSize: "10vh",
                  position: "fixed",
                  top: "1vh",
                }}
              />{ isActive &&
                <Container>
                <Paper
                  key={"second-box-content"}
                  variant="elevation"
                  sx={{
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Box
                    padding={1}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography variant="h3">
                    Limit Your Stress! Not Your Goals.
                    </Typography>
                    <Divider sx={{ padding: 1 }} />
                    <Typography fontSize={"2em"} variant="body1">
                     Financial planning is hard; there are many variables to keep track of. Limit allows you to input the numbers, and we do the math!
                    </Typography>
                  </Box>
                  <Box>

                  <ExampleProjections />
                  </Box>
                </Paper>
              </Container>}
              <KeyboardArrowDown
                className="swiper-button-next animate__animated animate__heartBeat animate__infinite"
                sx={{
                  fontSize: "10vh",
                  position: "fixed",
                  top: "90vh",
                }}
              />
            </Box>
          )}
        </SwiperSlide>
        <SwiperSlide id="thirdSlide" tabIndex={2} key="slide3">
          {({ isActive }) => (
            <Box
              key={"landing-third-box"}
              minHeight="100vh"
              maxHeight="100vh"
              sx={{
                display: "flex",
                flexDirection: "row",
                placeContent: "center center",
                placeItems: "center center",
                backgroundImage: `url(${growMoney})`,
                backgroundSize: "cover",
              }}
            >
              <KeyboardArrowUp
                className="swiper-button-prev"
                sx={{
                  fontSize: "10vh",
                  position: "fixed",
                  top: "1vh",
                }}
              />{ isActive &&
              <Container>
                <Paper
                  key={"third-box-content"}
                  variant="elevation"
                  sx={{
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Box
                    padding={1}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography variant="h3">
                      Grow your finances to reach your goals!
                    </Typography>
                    <Divider sx={{ padding: 1 }} />
                    <Typography fontSize={"2em"} variant="body1">
                      We help you track your financial goals. That way you can keep your eyes on the prize!
                    </Typography>
                  </Box>
                  <ExampleGoalChart isActive={isActive} />
                </Paper>
              </Container>}
              <KeyboardArrowDown
                className="swiper-button-next animate__animated animate__heartBeat animate__infinite"
                sx={{
                  fontSize: "10vh",
                  position: "fixed",
                  top: "90vh",
                }}
              />
            </Box>
          )}
        </SwiperSlide>
        <SwiperSlide id="fourthSlide" tabIndex={2} key="slide4">
          {({ isActive }) => (
            <Box
              key={"landing-fourth-box"}
              minHeight="100vh"
              maxHeight="100vh"
              gap={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                placeContent: "center center",
                placeItems: "center center",
                backgroundImage: `url(${techBackground})`,
                backgroundSize: "cover",
              }}
            >
              <KeyboardArrowUp
                className="swiper-button-prev"
                sx={{
                  fontSize: "10vh",
                  position: "fixed",
                  top: "1vh",
                }}
              />{ isActive &&
              <Container>
                <Paper
                  key={"fourth-box-content"}
                  variant="elevation"
                  sx={{
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Box
                    padding={1}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography variant="h3">
                      Use advanced analytics to monitor your progress and reach
                      your goal.
                    </Typography>
                    <Divider sx={{ padding: 1 }} />
                    <Typography fontSize={"2em"} variant="body1">
                      We put advanced visualization tools at your fingertips to
                      help conceptualize your financial picture.
                    </Typography>
                  </Box>
                  <ExampleLineChart isActive={isActive} />
                </Paper>
              </Container>}
              <Box
                sx={{
                  fontSize: "5vh",
                }}
              >
                <Button
                  href="createuser"
                  variant="contained"
                  sx={{
                    fontSize: "5vh",
                  }}
                >
                  Sign-up Today!
                </Button>
              </Box>
            </Box>
          )}
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default Landing;
