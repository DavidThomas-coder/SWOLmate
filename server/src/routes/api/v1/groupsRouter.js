import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"

import { Group } from "../../../models/index.js"

const groupsRouter = new express.Router()

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

export default groupsRouter