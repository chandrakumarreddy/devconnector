// third party modules
import express from "express";

//custom modules
import db from "./config/db";

//db connection
db();

//defining port
const PORT = process.env.PORT || 5000;

//server instance
const app = express();

//routes
app.get("/", (req, res) => res.send("hi"));

//listening to server
app.listen(PORT, () => console.log(`server listening at port ${PORT}`));
