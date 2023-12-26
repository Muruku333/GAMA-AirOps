const GroupModel = require ("../../models/masters/group");
const status = require("../../helpers/Response");
const { validationResult } = require("express-validator");

const GroupController = {
    createGroup: async (req, res)=>{
        let result;
        let group_id;
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
          }
          const {operatorId, groupName, groupMembers,createdBy}= req.body;
          const group = {
            operator_id: operatorId,
            group_name: groupName,
            created_by: createdBy,
            modified_by: createdBy
          }
          result = await GroupModel.createGroup(group);
          if (result.insertId > 0) {
            let groupMembersResult;
            const group = await GroupModel.getGroupById(result.insertId);
            group_id = group[0].group_id;
            if(groupMembers.length>0){
                const membersData = await groupMembers.map((member)=>[
                    group_id,
                    member.crewId,
                    member.onDutyAs
                ]);

                groupMembersResult= await GroupModel.createGroupMembers(membersData);
            }

            if(groupMembers.length>0 && !groupMembersResult>0){
                await GroupModel.deleteGroupByCondition({group_id});
                return status.ResponseStatus(res, 400, `Failed to create Group`);
            }
            return status.ResponseStatus(res, 201, `Group created successfully`);
          }
          return status.ResponseStatus(res, 400, `Failed to create Group`);
        } catch (error){
            return status.ResponseStatus(res, 500, "Internal server error", {
                error: error.message,
              });
        }
    },

    getAllGroups: async (req, res)=>{
        try {
            const groups = await GroupModel.getAllGroups();
            if (groups.length > 0) {
              return status.ResponseStatus(
                res,
                200,
                "List of all Groups",
                groups
              );
            }
            return status.ResponseStatus(res, 400, "No data found");
          } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", {
              error: error.message,
            });
          }
    },

    getGroupByGroupId: async (req, res)=>{
        try {
            const group_id = req.params.group_id;
            const group = await GroupModel.getGroupByCondition({ group_id });
            if (group.length > 0) {
              const group_members = await GroupModel.getGroupMembersByCondition({group_id});
      
              const groupData = [
                {
                  ...group[0],
                  group_members
                },
              ];
      
              return status.ResponseStatus(
                res,
                200,
                `Details of Group(${group_id})`,
                groupData
              );
            }
            return status.ResponseStatus(res, 400, `No data found for ${group_id}`);
          } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", {
              error: error.message,
            });
          }
    },

    updateGroupByGroupId: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return status.ResponseStatus(res, 400, "Validation Failed", errors);
            }
            const group_id = req.params.group_id;
            const {operatorId, groupName, groupMembers,modifiedBy}= req.body;

            let groupMembersResult;
            const initialResult = await GroupModel.getGroupByCondition({group_id});

            if(initialResult.length<1){
                return status.ResponseStatus(res, 404, "Group not found");
            }

            const group = {
                operator_id: operatorId,
                group_name: groupName,
                modified_by: modifiedBy
              }

            const result = await GroupModel.updateGroupByCondition({group_id},group);

            if(result.affectedRows>0){
                await GroupModel.deleteGroupMembersByCondition({group_id});

                if(groupMembers.length>0){
                    const groupMembersData = await groupMembers.map((member)=>[
                        group_id,
                        member.crewId,
                        member.onDutyAs
                    ]);

                    groupMembersResult = await GroupModel.createGroupMembers(groupMembersData);

                }

                return status.ResponseStatus(res, 200, `Group updated successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to update Group`);
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });

        }
    },

    deleteGroupByGroupId: async (req, res)=>{
        try {
            const group_id = req.params.group_id;
            const result = await GroupModel.deleteGroupByCondition({group_id});
      
            if (result.affectedRows > 0) {
              return status.ResponseStatus(res, 200, `Group deleted successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to delete Group`);
          } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", {
              error: error.message,
            });
          }
    }
};

module.exports = GroupController;