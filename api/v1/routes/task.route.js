import {Router} from "express";
import * as controller from "../controllers/task.controller.js";

const router = Router();

router.get("/", controller.index);
router.get("/detail/:idTask", controller.detail);

export default router;