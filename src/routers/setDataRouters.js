import express from "express";
import { removeTodaysRecord } from "../controllers/recordControllers";

const setDataRouter = express.Router();

setDataRouter.post("/record/remove-todays", removeTodaysRecord);

export default setDataRouter;
