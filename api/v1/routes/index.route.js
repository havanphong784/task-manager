import taskRoute from "./task.route.js";
import userRoute from "./user.route.js";

const routes = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoute);
  app.use(version + "/users", userRoute);
};

export default routes;