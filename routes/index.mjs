import { Router } from "express";
import { addHallCtrl, deleteHallCtrl } from "../controller/hallManage.mjs";

const router = Router();

router.post("/addHall", addHallCtrl);
router.post("/deleteHall", deleteHallCtrl);

export default router;
