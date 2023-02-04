import React, { useCallback, useEffect } from "react";
import "./App.css";
import { CssBaseline, PaletteMode } from "@mui/material/";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { setUser } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { blueGrey, deepOrange, grey } from "@mui/material/colors";
import { setAccounts } from "./store/accountsSlice";
import { setGoals } from "./store/goalsSlice";
import { setEntries } from "./store/entriesSlice";
import { setReoccurEntries } from "./store/reoccurEntriesSlice";
import { useSelector } from "react-redux";
import {addDays, addMonths, addYears, endOfDay, parseISO} from 'date-fns';
import { EntryAttributes } from './../server/db/models/Entry.model';


export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const dispatch = useDispatch();
  const { entries } = useSelector((state:any) => state.entries)
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
            authorization: `Bearer ${token}`,
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
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(setAccounts(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const goalsWithToken = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/goals", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(setGoals(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const entriesWithToken = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/entries", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log({'Entries':response.data});
        dispatch(setEntries(response.data));
        // populating an array of recurring entries
        // to be displayed on calendar component
        // const reEnt:EntryAttributes[]=[];
        // response.data.forEach((entry:EntryAttributes)=>{
        //   if(entry.frequency==='ByDate'){
        //     reEnt.push(entry);
        //   }else if(entry.frequency==='Monthly'){
        //     for (let i = 0; i <= 24; i++){
        //       reEnt.push(entry);
        //       //entry.start = addMonths(entry.start, 1);
        //     };
        //   };
        //   if(entry.frequency==='Weekly'){
        //     for (let i = 0; i <= 104; i++){
        //       reEnt.push(entry);
        //       //entry.start = addDays(entry.start, 7);
        //     };
        //   };
        //   if(entry.frequency==='Bi-Weekly'){
        //     for (let i = 0; i <= 52; i++){
        //       reEnt.push(entry)
        //       //entry.start = addDays(entry.start, 14)
        //     };
        //   };
        //   console.log({'Recurring entries':reEnt})
        //   dispatch(setReoccurEntries(reEnt));
        // });
      };
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);


  /** creates and saves reoccuring entries */ 
  // const reoccurEntriesFetch = () => {
  //   let reEnt: {}[] = [];

  //  entries.forEach((ent: {frequency: string, start: Date}) => {
  //   if (ent.frequency === 'ByDate'){
  //     reEnt.push(ent)

  //   } else if (ent.frequency === 'Monthly'){
  //      for (let i = 0; i <= 24; i++){
  //       reEnt.push(ent)
  //       ent.start = addMonths(ent.start, 1)
        
  //      }

  //   } else if (ent.frequency === 'Weekly'){
  //     for (let i = 0; i <= 104; i++){
  //       reEnt.push(ent)
  //       ent.start = addDays(ent.start, 7)
        
  //      }
  //   } else if (ent.frequency === 'Bi-Weekly') {
  //     for (let i = 0; i <= 52; i++){
  //       reEnt.push(ent)
  //       ent.start = addDays(ent.start, 14)
        
  //      }


  //   }

  //  }
  
   
   
  //  )
  
  //   dispatch(setReoccurEntries(reEnt))

  // }

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  /** watches entries state and runs reoccur fetch*/
  // useEffect(() => {
  //   reoccurEntriesFetch()
  
  // }, [entries]);

  useEffect(() => {
    loginWithToken();
    accountsWithToken();
    goalsWithToken();
    entriesWithToken();
    

    const existingPreference = localStorage.getItem("colorModeCookie");
    if (existingPreference) {
      existingPreference === "light" ? setMode("light") : setMode("dark");
    } else {
      setMode("light");
      localStorage.setItem("colorModeCookie", "light");
    }
  }, [accountsWithToken, entriesWithToken, goalsWithToken, loginWithToken]);

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
