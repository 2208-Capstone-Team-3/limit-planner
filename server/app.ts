import express from "express";
import path from "path";
import morgan from "morgan";
import api from "./api/index.js";
const app = express();

// Set up middleware
app.use(morgan("combined"));
app.use(express.json());

// Set up routes
app.use("/api", api);

// Pass back everything else / front-end
app.use("/public", express.static(path.join(import.meta.url, "../public")));

export default app;
