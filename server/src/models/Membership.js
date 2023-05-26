const Model = require("./Model")

class Membership extends Model {
    static get tableName() {
        return "memberships"
    }

    static get relationMappings() {
        const {User, Group} = require("./index.js")

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "memberships.userId",
                    to: "users.id"
                }
            },
            groups: {
                relation: Model.BelongsToOneRelation,
                modelClass: Group,
                join: {
                    from: "memberships.groupId",
                    to: "groups.id"
                }
            }
        }
    }
}

module.exports = Membership