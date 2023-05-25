const Model = require("./Model")

class Group extends Model {
    static get tableName() {
        return "groups"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["ownerId", "groupName"],
            properties: {
                ownerId: { type: ["integer", "string"] },
                groupName: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const {User, Membership, Note} = require("./index.js")

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "groups.userId",
                    to: "users.id"
                }
            },
            memberships: {
                relation: Model.HasManyRelation,
                modelClass: Membership,
                join: {
                    from: "groups.id",
                    to: "memberships.groupId"
                }
            },
            notes: {
                relation: Model.HasManyRelation,
                modelClass: Note,
                join: {
                    from: "groups.id",
                    to: "notes.groupId"
                }
            },
            
        }
    }

    static async addGroup(newGroup) {
        const groupExists = await Group.query().findOne({id: newGroup.id})
        let postedGroup
        if (!groupExists) {
            postedGroup = await Group.query().insertAndFetch(newGroup)
        } else if (groupExists.group === newGroup.group) {
            postedGroup = await Group.query().patchAndFetchById(groupExists.id, {})
        } else {
            postedGroup = await Group.query().patchAndFetchById(groupExists.id, {
                group: newGroup.group
            })
        }
        return postedGroup
    }
}

module.exports = Group