import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"
import UserSerializer from "../../serializers/UserSerializer.js"
import { Group, User, Membership } from "../../../models/index.js"

const usersGroupsRouter = new express.Router()

usersGroupsRouter.get("/", async (req, res) => {
    const { id } = req.params
    try {
        const group = await Group.query().findById(id)
        const serializedGroup = GroupSerializer.showGroupDetails(group, req.user)
        return res.status(200).json({ group: serializedGroup })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default usersGroupsRouter