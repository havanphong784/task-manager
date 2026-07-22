import express from 'express';
import 'dotenv/config';
import connectDB from './config/database.js';
import routesApiV1 from './api/v1/routes/index.route.js';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

routesApiV1(app);

app.listen(port, () => {
  console.log("Server đang chạy ở ", port)
});