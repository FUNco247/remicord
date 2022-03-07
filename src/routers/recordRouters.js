import express from "express";
import {
  getWrite,
  getHistory,
  reWrite,
  postWrite,
  getHistoryApi,
} from "../controllers/recordControllers";

const recordRouter = express.Router();

recordRouter.route("/write/:id([0-9a-f]{24})").get(getWrite).post(postWrite);
recordRouter.get("/history/:id([0-9a-f]{24})", getHistory);
recordRouter.get("/history/api", getHistoryApi);
recordRouter.get("/edit", reWrite);

export default recordRouter;
