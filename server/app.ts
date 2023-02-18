import express from "express";
import path from "path";
import api from "./api/index.js";
const app = express();

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/api", api);

// Pass back everything else / front-end
app.use("/public", express.static(path.join(import.meta.url, "../public")));
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
