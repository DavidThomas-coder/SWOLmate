const Model = require("./Model")

class Message extends Model {
    static get tableName() {
        return "messages"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["messageBody"],
            properties: {
                messageBody: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const {User, Chat } = require("./index.js")

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "messages.userId",
                    to: "users.id"
                }
            },
            chats: {
                relation: Model.BelongsToOneRelation,
                modelClass: Chat,
                join: {
                    from: "messages.chatId",
                    to: "chats.id"
                }
            }
        }
    }
}

module.exports = Message