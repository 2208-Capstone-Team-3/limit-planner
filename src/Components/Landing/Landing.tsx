import React, { Suspense } from "react";
import "./landing.css";
import "animate.css";
import lightLogo from "../../resources/logo.svg";
import darkLogo from "../../resources/ad-logo.svg";
import { useTheme } from "@mui/material/styles/";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import lightBackground from "../../resources/lightBackground.mp4";
import darkBackground from "../../resources/darkBackground.mp4";
import summitWoman from "../../resources/summitWoman.jpeg";
import growMoney from "../../resources/growMoney.jpeg";
import techBackground from "../../resources/techBackground.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectFade, Keyboard, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material/";

function usePhotometer<Type>(lightRet: Type, darkRet: Type): Type {
  const theme = useTheme();
  const colorMode: string = theme.palette.mode;
  return colorMode === "light" ? lightRet : darkRet;
}

function Landing() {
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

  return (
    <Suspense fallback={<CircularProgress />}>
      <Swiper
        modules={[Mousewheel, EffectFade, Keyboard, Navigation]}
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
            <KeyboardArrowDown
              className="swiper-button-next animate__animated animate__heartBeat animate__infinite"
              sx={{
                fontSize: "10vh",
                position: "fixed",
                top: "90vh",
              }}
            />
          </Box>
        </SwiperSlide>
        <SwiperSlide tabIndex={1} key="slide2">
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
            />
            <Grow in {...{ timeout: 3000 }}>
              <Container>
                <Paper
                  key={"second-box-content"}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Typography variant="h2">
                    Limit Your Stress! Not Your Goals.
                  </Typography>
                </Paper>
              </Container>
            </Grow>
            <KeyboardArrowDown
              className="swiper-button-next animate__animated animate__heartBeat animate__infinite"
              sx={{
                fontSize: "10vh",
                position: "fixed",
                top: "90vh",
              }}
            />
          </Box>
        </SwiperSlide>
        <SwiperSlide id="thirdSlide" tabIndex={2} key="slide3">
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
            />
            <Grow in {...{ timeout: 3000 }}>
              <Container>
                <Paper
                  key={"third-box-content"}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Typography variant="h2">
                    Grow your finances to reach your goals!
                  </Typography>
                </Paper>
              </Container>
            </Grow>
            <KeyboardArrowDown
              className="swiper-button-next animate__animated animate__heartBeat animate__infinite"
              sx={{
                fontSize: "10vh",
                position: "fixed",
                top: "90vh",
              }}
            />
          </Box>
        </SwiperSlide>
        <SwiperSlide id="fourthSlide" tabIndex={2} key="slide4">
          <Box
            key={"landing-fourth-box"}
            minHeight="100vh"
            maxHeight="100vh"
            sx={{
              display: "flex",
              flexDirection: "row",
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
            />
            <Grow in {...{ timeout: 3000 }}>
              <Container>
                <Paper
                  key={"fourth-box-content"}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Typography variant="h2">
                    Use advanced analytics to monitor your progress and reach
                    your goal.
                  </Typography>
                </Paper>
              </Container>
            </Grow>
            <Button
              variant="contained"
              sx={{
                fontSize: "5vh",
                position: "fixed",
                top: "80vh",
              }}
            >
              Sign-up Today!
            </Button>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Suspense>
  );
}

export default Landing;
