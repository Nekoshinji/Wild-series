import type { RequestHandler, Router } from "express";

const sayWelcome: RequestHandler = (req, res) => {
  res.send("Welcome to Wild Series!");
};

export default { sayWelcome };
