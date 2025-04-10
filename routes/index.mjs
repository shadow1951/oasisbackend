import { Router } from "express";
import {
  addHallCtrl,
  deleteHallCtrl,
  updateHallCtrl,
} from "../controller/hallManage.mjs";

const router = Router();

router.post("/addHall", addHallCtrl);
router.delete("/deleteHall/:hallId", deleteHallCtrl);
router.post("/updateHall", updateHallCtrl);

export default router;
