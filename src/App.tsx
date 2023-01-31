import React, { useCallback, useEffect } from "react";
import "./App.css";
import { CssBaseline, PaletteMode } from "@mui/material/";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { setUser } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { blueGrey, deepOrange, grey } from "@mui/material/colors";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.setItem(
          "colorModeCookie",
          mode === "light" ? "dark" : "light"
        );
      },
    }),
    [mode]
  );

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: blueGrey[600],
            },
            divider: blueGrey[700],
            background: {
              paper: blueGrey[500],
            },
            text: {
              primary: grey[900],
              secondary: grey[700],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[600],
            background: {
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

  const loginWithToken = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/auth", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  const accountsWithToken = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/accounts", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    loginWithToken();

    const existingPreference = localStorage.getItem("colorModeCookie");
    if (existingPreference) {
      existingPreference === "light" ? setMode("light") : setMode("dark");
    } else {
      setMode("light");
      localStorage.setItem("colorModeCookie", "light");
    }
  }, [loginWithToken]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <Outlet />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
