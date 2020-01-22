import express from "express";
import logger from "morgan";

import db from "./config/db";
import routes from "./api/routes";

//db connection
db();

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
routes(app);

export default app;
