import express from "express";
import {
  getWrite,
  getHistory,
  reWrite,
} from "../controllers/recordControllers";

const recordRouter = express.Router();

recordRouter.get("/write", getWrite);
recordRouter.get("/history", getHistory);
recordRouter.get("/edit", reWrite);

export default recordRouter;
