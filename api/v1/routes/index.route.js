import taskRoutes from "./task.route.js";

const routes = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoutes);
};

export default routes;