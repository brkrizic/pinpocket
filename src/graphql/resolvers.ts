import { Types } from "mongoose";
import Group, { GroupDocument } from "@/models/Group";
import Project, { ProjectDocument } from "@/models/Project";
import Task, { TaskDocument } from "@/models/Task";
import { Context } from "@/types/graphql"; // you can define a context type

interface PaginationArgs {
  limit?: number;
  skip?: number;
}

export const resolvers = {
  Query: {
    groups: async (_: unknown, __: unknown, context: Context) => {
      const groups = await Group.find({
        $or: [{ createdBy: context.userId }, { members: context.userId }],
      })
        .populate("members")
        .populate("createdBy");

      return groups.map((g: GroupDocument) => ({
        ...g.toObject(),
        id: g._id.toString(),
        members: g.members.map((m: any) => ({
          ...m.toObject(),
          id: m._id.toString(),
        })),
        createdBy: {
          ...g.createdBy.toObject(),
          id: g.createdBy._id.toString(),
        },
      }));
    },

    group: async (_: unknown, { id }: { id: string }) => {
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
        },
      };
    },
  },

  Group: {
    projects: async (parent: GroupDocument, args: PaginationArgs) => {
      const { limit = 10, skip = 0 } = args;
      const projects = await Project.find({ groupId: parent.id })
        .skip(skip)
        .limit(limit)
        .populate("createdBy");

      return projects.map((p: ProjectDocument) => ({
        ...p.toObject(),
        id: p._id.toString(),
        createdBy: {
          ...p.createdBy.toObject(),
          id: p.createdBy._id.toString(),
        },
      }));
    },
  },

  Project: {
    tasks: async (parent: ProjectDocument, args: PaginationArgs) => {
      const { limit = 10, skip = 0 } = args;
      const tasks = await Task.find({ projectId: parent.id })
        .skip(skip)
        .limit(limit)
        .populate("assignedTo")
        .populate("createdBy");

      return tasks.map((t: TaskDocument) => ({
        ...t.toObject(),
        id: t._id.toString(),
        assignedTo: t.assignedTo
          ? { ...t.assignedTo.toObject(), id: t.assignedTo._id.toString() }
          : null,
        createdBy: { ...t.createdBy.toObject(), id: t.createdBy._id.toString() },
      }));
    },
  },
};
