import connect from "@/utils/mongo";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(request){
    const {authorName, author, caption, media, mediaType} = await request.json();
    const newPost = new Post({
        author: author,
        authorName: authorName,
        caption: caption,
        media: media,
        mediaType: mediaType,
        likes: 0
    });

    try{
        await newPost.save()
        return new NextResponse('Post Saved', {
            status: 200
        })
    }catch (err){
        console.log(err)
        return new NextResponse('Something went wrong', {
            status: 500
        })
    }
}