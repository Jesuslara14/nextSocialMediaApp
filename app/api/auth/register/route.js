import connect from "@/utils/mongo"
import User from "@/models/User"
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server"

export async function POST (request){
    const {username, email, password} = await request.json();
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        followers: 0
    })

    try{
        await newUser.save()
        return new NextResponse('New user created', {
            status: 200
        });
    }catch (err){
        console.log(err)
        return new NextResponse(err.message, {
            status: 500
        });
    }
};