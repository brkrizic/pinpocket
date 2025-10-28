import { Bookmark, status, TOKEN_NAME } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import BookmarkModel, { ITask } from "@/models/Task";
import connect from "@/lib/db";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session-jwt";
import Task from "@/models/Task";
import Project from "@/models/Project";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const task: ITask = await request.json();


    if (!task || !task.title ) {
      return NextResponse.json(
        { message: "Task data incomplete." },
        { status: status.clientError.badRequest }
      );
    }


    const savedTask = await Task.create({
      ...task,
      createdAt: new Date(),
    });

    await Project.findByIdAndUpdate(task.projectId, {
      $push: { tasks: savedTask._id }
    });

    return NextResponse.json(
      { message: "Task created.", data: savedTask },
      { status: status.successful.created }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: status.serverError.internalServerError }
    );
  }
}
