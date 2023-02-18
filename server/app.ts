import express from "express";
import path from "path";
import api from "./api/index.js";
import { fileURLToPath } from "url";
const app = express();
const __dirname = fileURLToPath(import.meta.url);

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/api", api);

// Pass back everything else / front-end
app.use("/public", express.static(path.join(__dirname, "../public")));
let root = path.join(__dirname, "..", "..", "build");
console.log(root);
app.use(express.static(root));

app.use(function (req, res, next) {
  if (
    req.method === "GET" &&
    req.accepts("html") &&
    !req.is("json") &&
    !req.path.includes(".")
  ) {
    res.sendFile("index.html", { root });
  } else next();
});

export default app;
