import { NextResponse } from 'next/server';
import { writeFileSync, existsSync, writeFile } from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';

export async function GET(
  req: Request
) {  
  try {
    let data = await kv.lrange('tas', 0, -1);
    
    return data ? NextResponse.json(data) : NextResponse.json({'status' : 'fail'})
  } catch (err) {
    console.log(err)
  }
} 

export async function PUT(
  req : Request
) {
  try {
  kv.lpush('tas',req.body);

  return NextResponse.json({"status" : 201});
  } catch (err) {
    console.log(err)
  }
}

export async function DELETE(
  req : Request
) {
  try{
    kv.lrem('tas',0, req.body)

    return NextResponse.json({'status' : 200})
  } catch (err) {
    console.log(err)
  }
}