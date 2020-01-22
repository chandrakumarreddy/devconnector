import http from "http";
import app from "./app";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//listening to server
server.listen(PORT, () => console.log(`server listening at port ${PORT}`));
