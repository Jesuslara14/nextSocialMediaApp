import User from "@/models/User";
import { NextResponse } from "next/server";
import { parse } from 'url';

export async function PUT(request){
    const { query } = parse(request.url, true);

    const user = await User.findById(query.user);
    const target = await User.findById(query.target);

    if(user.following.includes(target._id)){
        target.followers--;
        user.following.splice(user.following.indexOf(target._id), 1);
    } else {
        target.followers++;
        user.following.push(target._id);
    }

    try{
        await user.save();
        await target.save();
            return new NextResponse('Followed', {
                status: 200
            });
        } catch {
            return new NextResponse('Error', {
                status: 500
            });
        }
}
