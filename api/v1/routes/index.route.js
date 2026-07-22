import taskRoute from "./task.route.js";
import userRoute from "./user.route.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const routes = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", authMiddleware.requireAuth, taskRoute);
  app.use(version + "/users", userRoute);
};

export default routes;