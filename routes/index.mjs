import { Router } from "express";
import { addHallCtrl } from "../controller/hallManage.mjs";

const router = Router();

router.post("/addHall", addHallCtrl);
export default router;
