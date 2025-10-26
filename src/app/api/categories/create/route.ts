import connect from "@/lib/db";
import Category from "@/models/Project";
import { Category as CategoryType, status } from "@/types/types";
import { getUserId } from "@/utils/tokenHelper";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        await connect();

        const category: CategoryType = await request.json();
        const userId = await getUserId(request);

        if(!userId){
            return NextResponse.json(
            { message: "Unauthorized: Invalid token" },
            { status: status.clientError.unauthorized }
            );
        }

        if(!category.name){
            return NextResponse.json({message: "Category data incompleted"}, {status: status.clientError.badRequest})
        }

        const newCategory = await Category.create({...category, userId: userId});

        return NextResponse.json({success: true, message: "New category created", data: newCategory}, {status: status.successful.created});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: status.serverError.internalServerError});
    }
}