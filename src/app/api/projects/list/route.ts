import connect from "@/lib/db";
import Category from "@/models/Project";
import { Category as CategoryType, status } from "@/types/types";
import { getUserId } from "@/utils/token";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    try {
        await connect();
        const userId = await getUserId();

        const categories = await Category.find({userId: userId});

        if(!categories){
            return NextResponse.json({message: "Categories not found"}, {status: status.clientError.notFound});
        }


        return NextResponse.json({success: true, data: categories}, {status: status.successful.ok})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: status.serverError.internalServerError});
    }
}