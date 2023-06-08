import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"
import UserSerializer from "../../serializers/UserSerializer.js"
import { Group, User, Membership } from "../../../models/index.js"

const groupsUsersRouter = new express.Router()

groupsUsersRouter.get("/", async (req, res) => {
    try {
        const users = await User.query()
        const serializedUsers = users.map(user => UserSerializer.showUserDetails(user))
        return res.status(200).json({ users: serializedUsers })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})


groupsUsersRouter.post("/", async (req, res) => {
    const { groupId, userId } = req.body
    console.log(req.body)

    try {
        const group = await Group.query().findById(groupId)
        if (!group) {
        return res.status(404).json({ error: "Group not found" })
        }

        const user = await User.query().findById(userId)
        if (!user) {
        return res.status(404).json({ error: "User not found" })
        }

        // Check if the user is already a member of the group
        const existingMembership = await Membership.query()
        .where({
            groupId: group.id,
            userId: user.id,
        })
        .first()

        if (existingMembership) {
        return res.status(400).json({ error: "User is already a member of the group" })
        }

        // Create a new membership record to associate the user with the group
        const newMembership = await Membership.query().insert({
        groupId: group.id,
        userId: user.id,
        })

        // Serialize the updated group with the associated users
        const serializedGroup = GroupSerializer.showGroupDetails(updatedGroup)
        return res.status(201).json({ group: serializedGroup })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
})

export default groupsUsersRouter