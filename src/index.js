import express from "express";
import globalRouter from "./routers/globalRouters.js";

const app = express();

app.use("/", globalRouter);

const PORT = 8282;
const handleListening = () => console.log(`server is running port no.${PORT}`);
app.listen(PORT, handleListening);

console.log("lets go");
