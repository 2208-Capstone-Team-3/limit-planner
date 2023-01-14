import express from "express";
const app = express();
import path from "path";
import morgan from "morgan";
import api from "./api";

// Set up middleware
app.use(morgan("combined"));
app.use(express.json());

// Set up routes
app.use("/api", api);

// Pass back everything else / front-end
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

export default app;
