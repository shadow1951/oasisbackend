import { Router } from "express";
import {
  addHallCtrl,
  deleteHallCtrl,
  updateHallCtrl,
} from "../controller/hallManage.mjs";
import { addDummyUser } from "../dummy.mjs";
import { jwtVerify } from "../auth/jwtVerify.mjs";

const router = Router();

router.post("/addHall", addHallCtrl);
router.delete("/deleteHall/:hallId", deleteHallCtrl);
router.post("/updateHall", updateHallCtrl);
router.post("/addDummyUser", addDummyUser);

export default router;
