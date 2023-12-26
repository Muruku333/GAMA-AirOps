const express = require("express");
const groupController = require("../../controllers/masters/group");
const router = express.Router();
const validation = require("../../middlewares/masters/groupValidator");

router
  .route("/groups")
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);

router
  .route("/groups/:group_id")
  .get(groupController.getGroupByGroupId)
  .put(groupController.updateGroupByGroupId)
  .delete(groupController.deleteGroupByGroupId);

module.exports = router;
