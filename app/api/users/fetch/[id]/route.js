import connect from "@/utils/mongo";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try{
        const user = await User.findById(params.id);
        return NextResponse.json({ body: {
            id: user._id,
            username: user.username,
            bio: user.bio,
            avatar: user.avatarurl,
            followers: user.followers
        }});
    }catch{
        return new NextResponse('Something went wrong', {
            status: 500
        });
    }
}