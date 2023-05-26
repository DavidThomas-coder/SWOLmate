import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import chatsRouter from "./api/v1/chatsRouter.js";
import groupsRouter from "./api/v1/groupsRouter.js";

const rootRouter = new express.Router();


rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/chats", chatsRouter)
rootRouter.use("/api/v1/groups", groupsRouter)

//place your server-side routes here

export default rootRouter;
