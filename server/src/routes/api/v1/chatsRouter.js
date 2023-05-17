import express from "express";
import { ValidationError } from "objection";
import chatsMessagesRouter from "./chatsMessagesRouter.js";
// import UserSerializer from "../../serializers/UserSerializer.js";
import ChatSerializer from "../../serializers/ChatSerializer.js";

import { Chat, Message, User } from "../../../models/index.js";

const chatsRouter = new express.Router();

chatsRouter.use("/:id/messages", chatsMessagesRouter)

// chatsRouter.get("/", async (req, res) => {
//     try {
//         const chats = await Chat.query()
//         const serializedChats = chats.map(chat => ChatSerializer.showChatDetails(chat))
//         return res.status(200).json({ chats: serializedChats })
//     } catch (error) {
//         return res.status(500).json({ errors: error })
//     }
// })

// chatsRouter.get("/", async (req, res) => {
//     try {
//         const currentUser = req.user
//         const relatedChats = await currentUser.$relatedQuery("chats")
//         const serializedChats = await ChatSerializer.showChatDetails(relatedChats)

//         return res.status(200).json({ chats: serializedChats })
//     } catch (error) {
//         res.status(500).json({ errors: error.message })
//     }
// })

//BELOW IS OG GET, WORKED BEFORE IMPLEMENTING ADJUSTED CHAT SERIALIZER

// chatsRouter.get("/", async (req, res) => {
//     try {
//         const chats = await req.user.$relatedQuery("chats")

//         return res.status(200).json({ user: req.user, chats: chats })
//     } catch (error) {
//         res.status(500).json({ errors: error.message })
//     }
// })

//BELOW IS NEW GET, AFTER IMPLEMENTING ADJUSTED CHAT SERIALIZER

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
    try {
        const newChat = await Chat.query().insert({})
        return res.status(201).json({ chat: newChat })
    } catch (error) {
        return res.status(500).json({ errors: error})
    }
})

// chatsRouter.post("/:id", async (req, res) => {
//     const chatId = req.params.id
//     const newMessageBody = req.body.message.messageBody
//     console.log(req.body)
//     try {
//         // const userId = req.user.id
//         // console.log("Below is the chatId")
//         // console.log(chatId)
//         console.log("Below is the newMessageBody!!!!")
//         console.log(newMessageBody)
//         const newMessage = await Message.query().insert({ messageBody: newMessageBody, chatId: chatId, userId: req.user.id })
//         return res.status(201).json({ message: newMessage })
//     } catch (error) {
//         console.log(error)
//         if (error instanceof ValidationError) {
//             return res.status(422).json({ errors: error.data })
//         }
//         return res.status(500).json({ error: "Unable to add message!" })
//     }
// })

export default chatsRouter;