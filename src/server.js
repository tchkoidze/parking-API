import express, { request, response } from "express";
import {
  createParkinZoneTable,
  createPasswordRecoveryTable,
  createUserCarTable,
  createUserTable,
  createVerificationsTable,
} from "./config/sql.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user-rotes.js";
import userCarRouter from "./routes/userCar-router.js";

const app = express();

async function init() {
  try {
    await createUserTable();
    await createVerificationsTable();
    await createPasswordRecoveryTable();
    await createUserCarTable();
    await createParkinZoneTable();
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/api", userRouter);
    app.use("/api", userCarRouter);
    app.listen(3000);
  }
}

init();
