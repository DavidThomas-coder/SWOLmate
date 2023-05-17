import express from "express";
import { ValidationError } from "objection";
// import UserSerializer from "../../serializers/UserSerializer.js";
import ChatSerializer from "../../serializers/ChatSerializer.js";

import { Chat, Message } from "../../../models/index.js";

const chatsRouter = new express.Router();

chatsRouter.get("/", async (req, res) => {
    try {
        const chats = await Chat.query()
        const serializedChats = chats.map(chat => ChatSerializer.showChatDetails(chat))
        return res.status(200).json({ chats: serializedChats })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

chatsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const chat = await Chat.query().findById(id)
        const serializedChat = await ChatSerializer.showChatDetails(chat)
        return res.status(200).json({ chat: serializedChat })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

chatsRouter.post("/:id", async (req, res) => {
    const chatId = req.params.id
    const newMessageBody = req.body.message 
    try {
        const userId = req.user.id
        const newMessage = await Message.query().insert({ messageBody: newMessageBody, userId, chatId })
        return res.status(201).json({ message: newMessage })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ error: "Unable to add message!" })
    }
})

export default chatsRouter;