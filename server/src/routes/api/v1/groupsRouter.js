import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"
import groupsUsersRouter from "./groupsUsersRouter.js"
import groupsNotesRouter from "./groupsNotesRouter.js"

import { Group, Membership } from "../../../models/index.js"

const groupsRouter = new express.Router()

groupsRouter.use("/:id/users", groupsUsersRouter)
groupsRouter.use("/:id/notes", groupsNotesRouter)

groupsRouter.get("/", async (req, res) => {
    try {
        const groups = await Group.query()
        const serializedGroups = groups.map(group => GroupSerializer.showGroupDetails(group))
        return res.status(200).json({ groups: serializedGroups })
    }
    catch(error) {
        return res.status(500).json({ errors: error })
    }
})

groupsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
        try {
            const group = await Group.query().findById(id)
            group.users = await group.$relatedQuery("users") 
            return res.status(200).json({ group: group }) 
            return res.status(500).json({ errors: error })
        }
    })

groupsRouter.post("/", async (req, res) => {
    try {
        const ownerId = req.user.id
        const groupName = req.body.groupName
        const newGroup = await Group.query().insert({groupName: groupName, ownerId: ownerId})
        return res.status(201).json({group: newGroup})
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default groupsRouter
