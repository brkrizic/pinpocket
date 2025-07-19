import connect from "@/lib/db";
import Group from "@/models/Group";
import { status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest){
    try {
        await connect();

        const {searchParams} = new URL(request.url);
        const groupId = searchParams.get('id');

        if(!groupId){
            return NextResponse.json({message: "Group ID is missing"}, {status: status.clientError.badRequest});
        }

        const deletedGroup = await Group.findByIdAndDelete(groupId);

        if(!deletedGroup){
            return NextResponse.json({message: "Group not found"}, {status: status.clientError.notFound});
        }

        return NextResponse.json({message: "Group deleted"}, {status: status.successful.ok});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: status.serverError.internalServerError})
    }
}