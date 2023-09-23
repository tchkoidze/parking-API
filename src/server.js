import express, { request, response } from "express";
import { createUserTable } from "./config/sql.js";

const app = express();

async function init() {
  try {
    await createUserTable();
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.get("/", (request, response) => {
      return response.status(200).json({ message: "works!" });
    });
    app.listen(3000);
  }
}

init();
