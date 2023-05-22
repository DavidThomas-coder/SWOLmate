import express from "express";
import { ValidationError } from "objection";
import UserSerializer from "../../serializers/UserSerializer.js";
import uploadImage from "../../../services/uploadImage.js";

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

usersRouter.get("/image", async (req, res) => {
  try {
    const userToReturn = await User.query().findById(req.user.id);
    return res.status(200).json({ photo: userToReturn.imageUrl });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/image", uploadImage.single("image"), async (req, res) => {
  try {

    const { body } = req;
    console.log(body.image)
    console.log(req.file.location)

    const data = {
      ...body,
      image: req.file.location,
    };
    const user = await User.query().findById(req.user.id);
    await user.$query().patch({ imageUrl: req.file.location });
    console.log(user)
    return res.status(201).json({ photo: user.imageUrl });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;