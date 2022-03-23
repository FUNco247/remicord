import express from "express";
import {
  getEdit,
  postEdit,
  handleLogin,
  handleLogout,
  handleJoin,
  getGroupJoin,
  getPersonalJoin,
  postPersonalJoin,
  postLogin,
  getFindPW,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route("/login").get(handleLogin).post(postLogin);
userRouter.get("/logout", handleLogout);
userRouter.get("/join", handleJoin);
userRouter.route("/join/personal").get(getPersonalJoin).post(postPersonalJoin);
userRouter.get("/join/group", getGroupJoin);
userRouter.get("/findPW", getFindPW);

userRouter.route("/edit/:id([0-9a-f]{24})").get(getEdit).post(postEdit);

export default userRouter;
