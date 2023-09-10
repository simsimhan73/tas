import { NextResponse } from 'next/server';
import { writeFileSync, existsSync, writeFile } from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';

const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function GET(
  req: Request
) {  
  try {
    let x : string = await req.url.slice(26,28);
    let allDate : number[] = [...Array(lastDate[Number.parseInt(x)]).keys()].map(key => key + 1);
    let data = new Array();

    for (let i of allDate) {
      data.push( await kv.lrange(i < 10 ? '0' + i.toString() : i.toString(), 0, -1));
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