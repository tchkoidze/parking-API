import express, { request, response } from "express";
import {
  createPasswordRecoveryTable,
  createUserTable,
  createVerificationsTable,
} from "./config/sql.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user-rotes.js";

const app = express();

async function init() {
  try {
    await createUserTable();
    await createVerificationsTable();
    await createPasswordRecoveryTable();
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/api", userRouter);
    app.listen(3000);
  }
}

init();
