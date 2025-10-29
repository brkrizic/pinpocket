
import { NextRequest, NextResponse } from "next/server";
import  { ITask } from "@/models/Task";
import connect from "@/lib/db";
import Task from "@/models/Task";
import Project from "@/models/Project";
import { status } from "@/types/types";

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

  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json(
      { error: message },
      { status: status.serverError.internalServerError }
    );
  }

}
