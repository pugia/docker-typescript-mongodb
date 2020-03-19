import { Request, Response, ErrorRequestHandler } from "express";
const mongoose = require("mongoose");

const connect = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then((res: Response, err: ErrorRequestHandler) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve();
      });
  });
}

export { connect }