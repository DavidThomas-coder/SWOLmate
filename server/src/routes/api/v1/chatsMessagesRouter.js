import express from "express";
import { Chat, Message } from "../../../models/index.js"
import { ValidationError } from "objection"

import MessageSerializer from "../../serializers/MessageSerializer.js";

const chatsMessagesRouter = new express.Router({ mergeParams: true })

chatsMessagesRouter.get("/", async (req, res) => {
    try {
        const messages = await Message.query()
        const serializedMessages = messages.map(message => MessageSerializer.showMessageDetails(message))
        return res.status(200).json({ messages: serializedMessages })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

chatsMessagesRouter.post("/", async (req, res) => {
    const chatId = req.params.id
    const newMessageBody = req.body.message.messageBody
    try {
        const newMessage = await Message.query().insert({ messageBody: newMessageBody, chatId: chatId, userId: req.user.id })
        return res.status(201).json({ message: newMessage })
    } catch (error) {
        console.log(error)
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ error: "Unable to add message!" })
    }
})

export default chatsMessagesRouter
