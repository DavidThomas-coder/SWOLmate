import express from "express";
import GroupSerializer from "../../serializers/GroupSerializer.js";
import UserSerializer from "../../serializers/UserSerializer.js";
import { Group, User, Membership } from "../../../models/index.js";

const usersGroupsRouter = new express.Router();

usersGroupsRouter.get("/:id/groups", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const ownedGroups = await Group.query().where("ownerId", id);

    const memberGroups = await Group.query()
      .joinRelated("memberships")
      .where("memberships.userId", id);

    console.log("ownedGroups:", ownedGroups)
    console.log("memberGroups:", memberGroups)

    const serializedOwnedGroups = ownedGroups.map((group) =>
      GroupSerializer.showGroupDetails(group, req.user)
    );

    const serializedMemberGroups = memberGroups.map((group) =>
      GroupSerializer.showGroupDetails(group, req.user)
    );

    return res.status(200).json({
      ownedGroups: serializedOwnedGroups,
      memberGroups: serializedMemberGroups,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


export default usersGroupsRouter;
