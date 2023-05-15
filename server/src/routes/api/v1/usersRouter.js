import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";


usersRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body)
  const { email, password, passwordConfirmation, firstName, age, pronouns, cityNeighborhood, experienceLevel } = formInput

const usersRouter = new express.Router();


usersRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {

    const persistedUser = await User.query().insertAndFetch({ email, password, firstName, age, pronouns, cityNeighborhood, experienceLevel })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;