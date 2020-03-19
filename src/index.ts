import "dotenv/config";
import express, { Request, Response } from "express";

import bodyParser from "body-parser";
const app = express();

import { connect } from "./db";
import { register } from "./register";
import { Member } from "./models/member";

 connect().then(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", async (req: Request, res: Response) => {
    return res.send(`Loading ${Math.random()}`);
  });

  app.get("/members", async (req: Request, res: Response) => {
    const members = await Member.find().select("firstName lastName");
    return res.send(members);
  });

  app.post("/register", register);
  
  console.log("===APPLICATION RUNNING===")
  app.listen(process.env.PORT || 80);
});
