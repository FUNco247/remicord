import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import "./db";
import "./models/Record";
import "./models/User";
import rootRouter from "./routers/rootRouters";
import userRouter from "./routers/userRouters";
import recordRouter from "./routers/recordRouters";
import setDataRouter from "./routers/setDataRouters";
import { localsMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // express 앱이 form의 value를 이해하게한다.
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/static", express.static("statics"));
app.use("/dest", express.static("dest"));
app.use("/", rootRouter);
app.use("/db", setDataRouter);
app.use("/user", userRouter);
app.use("/record", recordRouter);

const PORT = 8282;
const handleListening = () => console.log(`server is running port no.${PORT}`);
app.listen(PORT, handleListening);
