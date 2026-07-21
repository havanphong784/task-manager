import {Router} from "express";
import * as controller from "../controllers/task.controller.js";

const router = Router();

router.get("/", controller.index);
router.get("/detail/:idTask", controller.detail);
router.get("/change-status/:idTask", controller.changeStatus);

export default router;