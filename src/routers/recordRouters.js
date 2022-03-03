import express from "express";
import {
  getWrite,
  getHistory,
  reWrite,
  postWrite,
} from "../controllers/recordControllers";

const recordRouter = express.Router();

recordRouter.route("/write/:id").get(getWrite).post(postWrite);
recordRouter.get("/history/:id", getHistory);
recordRouter.get("/edit", reWrite);

export default recordRouter;
