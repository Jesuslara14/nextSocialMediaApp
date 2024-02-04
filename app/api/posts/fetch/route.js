import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { parse } from 'url';

export async function GET(request) {
  const { query } = parse(request.url, true);

  console.log(request.url)
  
  if(query.user != undefined){
    const posts = await Post.find({ author: query.user });
    return NextResponse.json({ body: posts });
  } else if(query.keyword != undefined) {
    const posts = await Post.find({ caption: { $regex: new RegExp(query.keyword, 'i') }});
    return NextResponse.json({ body: posts });
  } else {
    try{
    const posts = await Post.find();
    return NextResponse.json({ body: posts })
    } catch (err) {
        return new NextResponse('Error', {
            status: 400
        })
    }
  }

  
}