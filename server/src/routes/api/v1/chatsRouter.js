import express, { request } from "express";
import { ValidationError } from "objection";
import chatsMessagesRouter from "./chatsMessagesRouter.js";
import ChatSerializer from "../../serializers/ChatSerializer.js";

import { Chat, Message, User, UserChat } from "../../../models/index.js";

const chatsRouter = new express.Router();

chatsRouter.use("/:id/messages", chatsMessagesRouter)

chatsRouter.get("/", async (req, res) => {
    try {
        const chats = await req.user.$relatedQuery("chats")
        const serializedChats = await Promise.all(
            chats.map(async (chat) => {
                const serializedChat = await ChatSerializer.showChatDetails(chat, req.user)
                return serializedChat
            })
        )
        return res.status(200).json({ user: req.user, chats: serializedChats })
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

chatsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const chat = await Chat.query().findById(id)
        const serializedChat = await ChatSerializer.showChatDetails(chat, req.user)
        return res.status(200).json({ chat: serializedChat })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

chatsRouter.post("/", async (req, res) => {
    const requestedUserId = req.body.userId
    const currentUserId = req.user.id

    try {
            const requestedUser = await User.query().findById(requestedUserId)
            const requestedUserChats = await requestedUser.$relatedQuery("chats")
            const currentUserChats = await req.user.$relatedQuery("chats")
            let matchingChat
            requestedUserChats.forEach(requestedChat => {
                matchingChat = currentUserChats.find((currentUserChat) => {
                    return requestedChat.id === currentUserChat.id
                })  
            })

            let newChat
            if (matchingChat) {
                newChat = matchingChat
            } else {
                newChat = await Chat.query().insert({})

            const userChatOne = await UserChat.query().insert({ userId: requestedUserId, chatId: newChat.id })
            const userChatTwo = await UserChat.query().insert({ userId: currentUserId, chatId: newChat.id })
        }

        return res.status(201).json({ chat: newChat, currentUserId: currentUserId, requestedUserId: requestedUserId  })
    } catch (error) {
        return res.status(500).json({ errors: error})
    }
})

export default chatsRouter
