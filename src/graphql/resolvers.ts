/* eslint-disable @typescript-eslint/no-explicit-any */
// resolvers.ts
import Group from "@/models/Group";
import Project from "@/models/Project";
import Task from "@/models/Task";
import User from "@/models/User";

export const resolvers = {
  Query: {
    groups: async (_: any, __: any, context: any) => {
      // Only groups where the logged-in user is a member or creator
      const groups = await Group.find({
        $or: [
          { createdBy: context.userId },
          { members: context.userId }
        ]
      }).populate("members").populate("createdBy");

      return groups.map(g => ({
        ...g.toObject(),
        id: g._id.toString(),
        members: g.members.map((m: any) => ({
          ...m.toObject(),
          id: m._id.toString(),
        })),
        createdBy: {
          ...g.createdBy.toObject(),
          id: g.createdBy._id.toString(),
        }
      }));
    },

    group: async (_: any, { id }: { id: string }, context: any) => {
      const group = await Group.findById(id).populate("members").populate("createdBy");
      if (!group) return null;

      return {
        ...group.toObject(),
        id: group._id.toString(),
        members: group.members.map((m: any) => ({
          ...m.toObject(),
          id: m._id.toString(),
        })),
        createdBy: {
          ...group.createdBy.toObject(),
          id: group.createdBy._id.toString(),
        }
      };
    },
  },

  Group: {
    projects: async (parent: any, { limit = 10, skip = 0 }: any) => {
      const projects = await Project.find({ groupId: parent.id })
        .skip(skip)
        .limit(limit)
        .populate("createdBy");

      return projects.map(p => ({
        ...p.toObject(),
        id: p._id.toString(),
        createdBy: {
          ...p.createdBy.toObject(),
          id: p.createdBy._id.toString(),
        }
      }));
    },
  },

  Project: {
    tasks: async (parent: any, { limit = 10, skip = 0 }: any) => {
      const tasks = await Task.find({ projectId: parent.id })
        .skip(skip)
        .limit(limit)
        .populate("assignedTo")
        .populate("createdBy");

      return tasks.map(t => ({
        ...t.toObject(),
        id: t._id.toString(),
        assignedTo: t.assignedTo ? {
          ...t.assignedTo.toObject(),
          id: t.assignedTo._id.toString(),
        } : null,
        createdBy: {
          ...t.createdBy.toObject(),
          id: t.createdBy._id.toString(),
        }
      }));
    },
  },
};
