import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"

import { Group } from "../../../models/index.js"

const groupsRouter = new express.Router()

groupsRouter.get("/", async (req, res) => {
    try {
        const groups = await Group.query()
        const serializedGroups = groups.map(group => GroupSerializer.showGroupDetails(group))
        return res.status(200).json({ groups: groups })
    }
    catch(error) {
        return res.status(500).json({ errors: error })
    }
})

groupsRouter.post("/", async (req, res) => {
    try {
        const ownerId = req.user.id
        const groupName = req.body.groupName
        console.log("below is reqbody")
        console.log(req.body)
        const newGroup = await Group.query().insert({groupName: groupName, ownerId: ownerId})
        return res.status(201.).json({group: newGroup})
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default groupsRouter