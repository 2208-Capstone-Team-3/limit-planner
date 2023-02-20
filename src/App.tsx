import React, { useEffect, useMemo } from "react";
import "./App.css";
import { CssBaseline, PaletteMode } from "@mui/material/";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { setUser } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { blueGrey, deepOrange, grey } from "@mui/material/colors";
import { setAccounts } from "./store/accountsSlice";
import { setGoals } from "./store/goalsSlice";
import { setEntries } from "./store/entriesSlice";
import makeEntryCopies from "./../src/helpers/makeEntryCopies";
import { setReoccurEntries } from "./store/reoccurEntriesSlice";
import { setDateSelector } from "./store/themeSlice";
import { setSkipdates } from "./store/skipdatesSlice";
import { RootState } from "./store";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const dispatch = useDispatch();
  const todayDate = useMemo(() => new Date().toString(), []);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const skipdates = useSelector(
    (state: RootState) => state.skipdates.skipdates
  );

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

  /** creates and saves reoccuring entries */

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const skipdatesFetch = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/entries/skipdates", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          dispatch(setSkipdates(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    skipdatesFetch();
  }, [dispatch]);

  useEffect(() => {
    const reoccurEntriesFetch = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const entries = await axios.get("/api/entries", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          const entryCopies = await makeEntryCopies(entries.data, skipdates);
          dispatch(setReoccurEntries(entryCopies));
          return entryCopies;
        }
      } catch (err) {
        console.error(err);
      }
    };
    reoccurEntriesFetch();
  }, [dispatch, skipdates]);

  useEffect(() => {
    const loginWithToken = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/auth", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    loginWithToken();
  }, [dispatch]);

  useEffect(() => {
    const accountsWithToken = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/accounts", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          dispatch(setAccounts(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    accountsWithToken();
  }, [dispatch]);

  useEffect(() => {
    const goalsWithToken = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/goals", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          dispatch(setGoals(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    goalsWithToken();
  }, [dispatch]);

  useEffect(() => {
    const entriesWithToken = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/entries", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          dispatch(setEntries(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    entriesWithToken();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setDateSelector(todayDate));

    const existingPreference = localStorage.getItem("colorModeCookie");
    if (existingPreference) {
      existingPreference === "light" ? setMode("light") : setMode("dark");
    } else {
      setMode("light");
      localStorage.setItem("colorModeCookie", "light");
    }
  }, [dispatch, todayDate]);

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
