import connect from "@/lib/db";
import { checkSessionId } from "@/lib/session-redis";
import Group from "@/models/Group";
import { Group as GroupType, status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        await connect();
        const group: GroupType = await request.json();
        const userId = await checkSessionId();

        if (!group?.name || typeof group.name !== 'string') {
            return NextResponse.json(
                { message: "Group name is required" },
                { status: status.clientError.badRequest }
            );
        }

        const newGroup = await Group.create({
            ...group,
            usersId: [userId]
        });

        if (!newGroup) {
            return NextResponse.json(
                { message: "Failed to create group due to a conflict" },
                { status: status.clientError.conflict }
            );
        }

        return NextResponse.json(
            { message: "Group created", group: newGroup },
            { status: status.successful.created }
        );

    } catch (error: unknown) {
        return NextResponse.json({error: error}, {status: status.serverError.internalServerError})
    }
}