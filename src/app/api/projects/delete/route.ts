import connect from "@/lib/db";
import Category from "@/models/Project";
import { status } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest){
    try {
        await connect();

        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('id');

        if(!categoryId){
            return NextResponse.json({message: "Category ID is missing"}, {status: status.clientError.badRequest});
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if(!deletedCategory){
            return NextResponse.json({ message: "Catefory not found"}, {status: status.clientError.notFound});
        }

        return NextResponse.json({ success: true, message: "Category deleted"}, {status: status.successful.accepted});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: status.serverError.internalServerError});
    }
}