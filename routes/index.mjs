import { Router } from "express";
import { addHallCtrl, deleteHallCtrl } from "../controller/hallManage.mjs";

const router = Router();

router.post("/addHall", addHallCtrl);
router.delete("/deleteHall/:hallId", deleteHallCtrl);

export default router;
