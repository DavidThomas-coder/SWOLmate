import express from "express";
import { ValidationError } from "objection";
import chatsMessagesRouter from "./chatsMessagesRouter.js";
// import UserSerializer from "../../serializers/UserSerializer.js";
import ChatSerializer from "../../serializers/ChatSerializer.js";

import { Chat, Message, User, UserChat } from "../../../models/index.js";

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
    const requestedUserId = req.body.userId
    const currentUserId = req.user.id
    console.log("HEY BACKEND")
    console.log(`The requestedUserId is: ${requestedUserId}`)
    console.log(`The currentUserId is: ${currentUserId}`)
    // console.log(body)
    try {
        // Way 1, too many queries 
        // look up all chats that have a UserChat that has the requestedUserId
            // this provides you an array of userChats with that user's id
        
        // iterate over that array of userChats
            // for each userChat, query to see if there exists a userChat with that chat id, and the current user's id 
            // if not, then create a new chat,
            // if true, then query for that chat and return to the frontend 

        // BETTER WAY
            // get all of kayleighs chats 
            const requestedUserChats = await Chat.query().findById(requestedUserId)
            // get all of current user's chats 
            const currentUserChats = await Chat.query().findById(currentUserId)
            console.log("Below is requestedUserChats")
            console.log(requestedUserChats)
            console.log("Below is currentUserChats")
            console.log(currentUserChats)
            // iterate over kayleighs chats
                // use the find method to see of any of those chat ids match the user's chat ids 
            let matchingChat
            requestedUserChats.forEach(requestedChat => {
                matchingChat = currentUserChats.find((currentUserChat) => {
                    return requestedChat.id === currentUserChat.id
                })  
            })

            console.log("Below is matchingChat")
            console.log(matchingChat)

            let newChat
            if (matchingChat) {
                newChat = matchingChat
            } else {
                newChat = await Chat.query().insert({})

                newUserChat = await UserChat.query().insert([
                {userId: requestedUserId, chatId: newChat.id},
                {userId: currentUserId, chatId: newChat.id},
            ])
        }
        console.log("Below is newChat")
        console.log(newChat)


        // const newChat = await Chat.query().insert({})
        // const newChat = await Chat.addChat(body)
        return res.status(201).json({ chat: newChat, userChat: newUserChat })
    } catch (error) {
        return res.status(500).json({ errors: error})
    }
})

// chatsRouter.post("/", async (req, res) => {
//     const requestedUserId = req.body.userId;
//     const currentUserId = req.user.id;
    
//     try {
//         const requestedUserChats = await Chat.query().where('user_id', requestedUserId);
//         const currentUserChats = await Chat.query().where('user_id', currentUserId);

//         let matchingChat;

//         for (const requestedChat of requestedUserChats) {
//         matchingChat = currentUserChats.find((currentUserChat) => {
//             return requestedChat.id === currentUserChat.id;
//         });

//         if (matchingChat) {
//             break; // Exit the loop if a match is found
//         }
//         }

//         let newChat;

//         if (matchingChat) {
//         newChat = matchingChat; // Use the existing chat
//         } else {
//         newChat = await Chat.query().insert({}); // Create a new chat

//         // Associate the users with the new chat (example using UserChat model)
//         await UserChat.query().insert([
//             { user_id: requestedUserId, chat_id: newChat.id },
//             { user_id: currentUserId, chat_id: newChat.id },
//         ]);
//         }

//         return res.status(201).json({ chat: newChat });
//     } catch (error) {
//         return res.status(500).json({ errors: error });
//     }
//     });


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