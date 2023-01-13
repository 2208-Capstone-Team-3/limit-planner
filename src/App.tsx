import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { blueGrey } from "@mui/material/colors";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    true;
  },
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: blueGrey[500],
          },
          secondary: {
            main: blueGrey[50],
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <IconButton
          sx={{ ml: 1, position: "absolute" }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <Outlet />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
