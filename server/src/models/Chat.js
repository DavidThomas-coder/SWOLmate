const Model = require("./Model")

class Chat extends Model {
    static get tableName() {
        return "chats"
    }

    static get relationMappings() {
        const { User, UserChat, Message } = require("./index.js")

        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "chats.id",
                    through: {
                        from: "userChats.chatId",
                        to: "userChats.userId"
                    },
                    to: "users.id"
                }
            },
            userChats: {
                relation: Model.HasManyRelation,
                modelClass: UserChat,
                join: {
                    from: "chats.id",
                    to: "userChats.chatId"
                }
            },
            messages: {
                relation: Model.HasManyRelation,
                modelClass: Message,
                join: {
                    from: "chats.id",
                    to: "messages.chatId"
                }
            }
        }
    }
    

    static async addChat(newChat) {
        const chatExists = await Chat.query().findOne({id: newChat.id })
        let postedChat 
        if (!chatExists) {
            postedChat = await Chat.query().insertAndFetch(newChat)
        } else if (chatExists.chat === newChat.chat) {
            postedChat = await Chat.query().patchAndFetchById(chatExists.id, {})
        } else {
            postedChat = await Chat.query().patchAndFetchById(chatExists.id, {
                chat: newChat.chat
            })
        }
        return postedChat
    }
}

module.exports = Chat
