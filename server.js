import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import { dbConnection } from "./DataBase/DbConnection/DbConnection.js";
import { init } from "./index.routes.js";
import cors from "cors"
config();
const app = express();
app.use(express.json());
app.use(express.static('uploads'))
app.use(morgan("dev"));
app.use(cors())

init(app)
dbConnection
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`server runing`);
});

