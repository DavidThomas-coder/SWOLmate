import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"
import groupsUsersRouter from "./groupsUsersRouter.js"

import { Group, Membership } from "../../../models/index.js"

const groupsRouter = new express.Router()

groupsRouter.use("/:id/users", groupsUsersRouter)

groupsRouter.get("/", async (req, res) => {
    console.log("4")
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
    console.log("3")
    const { id } = req.params
        try {
            const group = await Group.query().findById(id)
            const serializedGroup = GroupSerializer.showGroupDetails(group)
            return res.status(200).json({ group: serializedGroup })
        } catch (error) {
            return res.status(500).json({ errors: error })
        }
    })

// groupsRouter.get("/:id/users", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const group = await Group.query().findById(id);
//         if (!group) {
//         return res.status(404).json({ error: "Group not found" });
//         }
//         const users = await group.$relatedQuery("users").select("id", "name");
//         return res.status(200).json({ users });
//     } catch (error) {
//         console.error("Error retrieving group users:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
//     });

groupsRouter.post("/", async (req, res) => {
    try {
        const ownerId = req.user.id
        const groupName = req.body.groupName
        const newGroup = await Group.query().insert({groupName: groupName, ownerId: ownerId})
        return res.status(201.).json({group: newGroup})
    } catch(error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default groupsRouter