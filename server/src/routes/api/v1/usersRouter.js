import express from "express";
import { ValidationError } from "objection";
import UserSerializer from "../../serializers/UserSerializer.js";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query()
    const serializedUsers = users.map(user => UserSerializer.showUserDetails(user))
    return res.status(200).json({ users: serializedUsers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

usersRouter.post("/", async (req, res) => {
  const { email, password, firstName, age, pronouns, cityNeighborhood, experienceLevel } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, firstName, age, pronouns, cityNeighborhood, experienceLevel });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: errors.message });
  }
});

export default usersRouter;