import connect from "@/lib/db";
import Group from "@/models/Group";
import Project from "@/models/Project";
import Category, { IProject } from "@/models/Project";
import { Category as CategoryType, status } from "@/types/types";
import { getUserId } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        await connect();

        const project: IProject = await request.json();
        // const userId = await getUserId(request);

        // if(!userId){
        //     return NextResponse.json(
        //     { message: "Unauthorized: Invalid token" },
        //     { status: status.clientError.unauthorized }
        //     );
        // }

        if(!project.name){
            return NextResponse.json({message: "Project data incompleted"}, {status: status.clientError.badRequest})
        }

        const newProject = await Project.create({ ...project });

        await Group.findByIdAndUpdate(project.groupId, {
            $push: { projects: newProject._id }
        });

        return NextResponse.json({success: true, message: "New project created", data: newProject}, {status: status.successful.created});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: status.serverError.internalServerError});
    }
}