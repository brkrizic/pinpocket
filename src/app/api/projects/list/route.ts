import connect from "@/lib/db";
import Category from "@/models/Project";
import { status } from "@/types/types";
import { getUserId } from "@/utils/token";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await connect();
        const userId = await getUserId();

        const categories = await Category.find({userId: userId});

        if(!categories){
            return NextResponse.json({message: "Categories not found"}, {status: status.clientError.notFound});
        }


        return NextResponse.json({success: true, data: categories}, {status: status.successful.ok})
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