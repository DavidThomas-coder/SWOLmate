const Model = require("./Model")

class Note extends Model {
    static get tableName() {
        return "notes"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["noteBody"],
            properties: {
                noteBody: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const {User, Group} = require("./index.js")

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "notes.userId",
                    to: "users.id"
                }
            },
            groups: {
                relation: Model.BelongsToOneRelation,
                modelClass: Group,
                join: {
                    from: "notes.groupId",
                    to: "groups.id"
                }
            }
        }
    }
}

module.exports = Note