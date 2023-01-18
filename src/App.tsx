import React from "react";
import "./App.css";
import { Box, CssBaseline, IconButton } from "@mui/material/";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material/";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
          // primary: {
          //   light: "#757ce8",
          //   main: "#3f50b5",
          //   dark: "#002884",
          //   contrastText: "#fff",
          // },
          // secondary: {
          //   light: "#ff7961",
          //   main: "#f44336",
          //   dark: "#ba000d",
          //   contrastText: "#000",
          // },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <Box>
        <IconButton
          sx={{ ml: 1, position: "fixed", zIndex: 6 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
          <Outlet />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
