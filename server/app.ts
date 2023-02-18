import express from "express";
import path from "path";
import api from "./api/index.js";
const app = express();

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/api", api);

// Pass back everything else / front-end
app.use("/build", express.static(path.join(import.meta.url, "../build")));
app.use("/public", express.static(path.join(import.meta.url, "../public")));

app.get("*", function (req, res) {
  res.sendFile("index.html", { root:  "./build" });
});
export default app;
