import express from "express";
import {
  home,
  handleLogin,
  handleLogout,
  handleJoin,
} from "../controllers/rootControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", handleLogin);
rootRouter.get("/logout", handleLogout);
rootRouter.get("/join", handleJoin);

export default rootRouter;
