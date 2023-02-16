import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
// components
import App from "./App";
import Landing from "./Components/Landing/Landing";
import ProjectionsComponent from "./Components/Projections/Projections";
import LoginPage from "./Components/Login/LoginPage";
import Home from "./Components/Home/Home";
import CreateUserPage from "./Components/UserCreation/UserCreationPage";
import HomeBasePortal from "./Components/Home/HomeBasePortal";
import Accounts from "./Components/Accounts/Accounts";
import SingleAccount from "./Components/Accounts/SingleAccount";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";



const userTokenTestTrue = async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) throw redirect("/home");
    return true
  } catch (error) {
    return false;
  }
};

const userTokenTestFalse = async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (!token) {
      throw redirect("/");
    }
    return true;
  } catch (error) {
    return false
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Landing />,
        loader: userTokenTestTrue,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: userTokenTestTrue,
      },
      {
        path: "createuser",
        element: <CreateUserPage />,
        loader: userTokenTestTrue,
      },
      {
        path: "projections",
        element: <ProjectionsComponent />,
      },
        {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "",
            element: <HomeBasePortal />,
          },
        ],
        loader: userTokenTestFalse,
      },
      {
        path: "accounts",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Accounts />,
          },
        ],
        loader: userTokenTestFalse,
      },
      {
        path: "single-account/:accountId",
        element: <Home />,
        children: [
          {
            path: "",
            element: <SingleAccount />,
          },
        ],
        loader: userTokenTestFalse,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
