import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request){
    const {userId, username, avatarUrl, bio, password} = await request.json();

    let user = await User.findById(userId);

    if(user) {
        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        if(passwordIsCorrect){
            try{
                user.username = username;
                user.bio = bio;
                user.avatarurl = avatarUrl;
                user.save();
                return new NextResponse('User updated successfully', {
                    status: 200
                })
            } catch (error) {
                return new NextResponse('Internal server error', {
                    status: 500
                })
            }
        } else {
            return new NextResponse('Wrong Password', {
                status: 401
            })
        }
    } else {
        return new NextResponse('User does not exist', {
            status: 404
        })
    }
}