import "dotenv/config";
import { Request, Response } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./db");
const { register } = require("./register");
import { Member } from "./models/member";

db.connect().then(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", async (req: Request, res: Response) => {
    return res.send(`Hit ${Math.random()}`);
  });

  app.get("/members", async (req: Request, res: Response) => {
    const members = await Member.find();
    return res.send(members);
  });

  app.post("/register", register);
  console.log("===APPLICATION RUNNING===")
  app.listen(process.env.PORT || 80);
});
