import { Request, Response, ErrorRequestHandler } from "express";
const mongoose = require("mongoose");

function connect() {
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

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
