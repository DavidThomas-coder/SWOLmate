const Model = require("./Model")

class UserChat extends Model {
    static get tableName() {
        return "userChats"
    }

    static get relationMappings() {
        const {User, Chat} = require("./index.js")

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "userChats.userId",
                    to: "users.id"
                }
            },
            chats: {
                relation: Model.BelongsToOneRelation,
                modelClass: Chat,
                join: {
                    from: "userChats.chatId",
                    to: "chats.id"
                }
            }
        }
    }
}

module.exports = UserChat