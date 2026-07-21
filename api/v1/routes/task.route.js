import {Router} from "express";
import * as controller from "../controllers/task.controller.js";

const router = Router();

router.get("/", controller.index);
router.get("/detail/:idTask", controller.detail);
router.patch("/change-status/:idTask", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.post("/create", controller.create);

export default router;