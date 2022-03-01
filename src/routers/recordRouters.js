import express from "express";
import {
  getWrite,
  getHistory,
  reWrite,
  postWrite,
} from "../controllers/recordControllers";

const recordRouter = express.Router();

recordRouter.route("/write").get(getWrite).post(postWrite);
recordRouter.get("/history", getHistory);
recordRouter.get("/edit", reWrite);

export default recordRouter;
