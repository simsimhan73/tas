import { NextRequest, NextResponse } from 'next/server';
import {kv} from '@vercel/kv';
import { useRouter } from 'next/router';

const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function GET(request : Request, { params }: { params: { slug: string } }) {  

  try {
    let allDate : number[] = [...Array(lastDate[Number.parseInt(params.slug.slice(4, 6))]).keys()].map(key => key + 1);
    let data = new Array();

    for (let i of allDate) {
      data.push(await kv.lrange(
        (params.slug.length > 5 ? params.slug : Number.parseInt(params.slug) / 10 * 10 + Number.parseInt(params.slug) % 10).toString()  + (i < 10 ? '0' + i.toString() : i.toString()), 0, -1));
    }
    
    return data ? NextResponse.json(data) : NextResponse.json({'status' : 'fail'})
  } catch (err) {
    console.log(err)
  }
} 


export async function PUT(
  req : Request
) {
  try {
    let x = await req.json();
    console.log(x)
    kv.lpush(x.date,x.content);

    return NextResponse.json({"status" : 201});
  } catch (err) {
    console.log(err)
  }
}

export async function DELETE(
  req : Request
) {
  try{
    let x = await req.json();
    kv.lrem(x,0, x.content)

    return NextResponse.json({'status' : 200})
  } catch (err) {
    console.log(err)
  }
}