import express from "express"
import GroupSerializer from "../../serializers/GroupSerializer.js"
import UserSerializer from "../../serializers/UserSerializer.js"
import { Group, User, Membership } from "../../../models/index.js"

const usersGroupsRouter = new express.Router()

usersGroupsRouter.get("/:id/groups", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      // Find all groups where the ownerId matches the user's ID
      const groups = await Group.query().where('ownerId', id);
      const serializedGroups = groups.map(group => GroupSerializer.showGroupDetails(group, req.user));
  
      return res.status(200).json({ groups: serializedGroups });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });  


export default usersGroupsRouter