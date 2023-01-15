import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import "./landing.css";
import "animate.css";
import lightLogo from "../resources/logo.svg";
import darkLogo from "../resources/ad-logo.svg";
import useTheme from "@mui/material/styles/useTheme";
import {
  Button,
  CircularProgress,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import lightBackground from "../resources/lightBackground.mp4";
import darkBackground from "../resources/darkBackground.mp4";
import summitWoman from "../resources/summitWoman.jpeg";
import growMoney from "../resources/growMoney.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/mousewheel";

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
    <Box key={"landing-overall-box"} minHeight="100%">
      <Suspense fallback={<CircularProgress variant="determinate" />}>
        <Swiper
          modules={[Mousewheel, EffectFade]}
          slidesPerView={1}
          direction="vertical"
          fadeEffect={{ crossFade: true }}
          mousewheel={{ thresholdDelta: 20 }}
          effect="fade"
          role="group"
          key="swiperGroup"
        >
          <SwiperSlide tabIndex={0} role={"group"} key="slide1">
            <Box
              key={"landing-top-box"}
              minHeight="100vh"
              sx={{
                display: "flex",
                placeContent: "center center",
                placeItems: "center center",
                flexDirection: "column",
              }}
            >
              {usePhotometer(lightVideoComp, darkVideoComp)}
              <img
                id="logo"
                src={usePhotometer(lightLogo, darkLogo)}
                alt="Limit Icarus over sun backdrop"
              />
              <Button variant="contained" sx={{ mt: 10 }}>
                Log-in
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide tabIndex={1} role={"group"} key="slide2">
            <Box
              key={"landing-second-box"}
              minHeight="100vh"
              sx={{
                display: "flex",
                flexDirection: "row",
                placeContent: "center center",
                placeItems: "center center",
                backgroundImage: `url(${summitWoman})`,
                backgroundSize: "cover",
              }}
            >
              <Grow in {...{ timeout: 3000 }}>
                <Paper
                  key={"second-box-content"}
                  variant="outlined"
                  sx={{
                    placeSelf: "",
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Typography variant="h2">
                    Limit Your Stress! Not Your Goals.
                  </Typography>
                </Paper>
              </Grow>
            </Box>
          </SwiperSlide>
          <SwiperSlide tabIndex={2} role={"group"} key="slide3">
            <Box
              key={"landing-third-box"}
              minHeight="100vh"
              sx={{
                display: "flex",
                flexDirection: "row",
                placeContent: "center center",
                placeItems: "center center",
                backgroundImage: `url(${growMoney})`,
                backgroundSize: "cover",
              }}
            >
              <Grow in {...{ timeout: 3000 }}>
                <Paper
                  key={"third-box-content"}
                  variant="outlined"
                  sx={{
                    placeSelf: "",
                    display: "flex",
                    placeContent: "center",
                  }}
                >
                  <Typography variant="h2">
                    Grow your finances to reach your goals!
                  </Typography>
                </Paper>
              </Grow>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Suspense>
    </Box>
  );
}

export default Landing;
