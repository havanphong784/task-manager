import express from 'express';
import 'dotenv/config';
import connectDB from './config/database.js';
import routesApiV1 from './api/v1/routes/index.route.js';
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

app.use(bodyParser.json());

routesApiV1(app);

app.listen(port, () => {
  console.log("Server đang chạy ở ", port)
});