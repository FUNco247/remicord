import express from "express";
import morgan from "morgan";
import "dotenv/config";
import firebase from "./firebase";
import "./db";
import "./models/Record";
import "./models/User";
import rootRouter from "./routers/rootRouters";
import userRouter from "./routers/userRouters";
import recordRouter from "./routers/recordRouters";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // express 앱이 form의 value를 이해하게한다.

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/record", recordRouter);

const PORT = 8282;
const handleListening = () => console.log(`server is running port no.${PORT}`);
app.listen(PORT, handleListening);
