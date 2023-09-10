import { NextResponse } from 'next/server';
import { writeFileSync, existsSync, writeFile } from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';

export async function GET(
  req: Request
) {  
  let data = await kv.lrange('tas', 0, -1);
  
  return data ? NextResponse.json(data) : NextResponse.json({'status' : 'fail'})
} 

export async function PUT(
  req : Request
) {
  kv.lpush('tas',req.body);

  return NextResponse.json({"status" : 201});
}

export async function DELETE(
  req : Request
) {
  kv.lrem('tas',0, req.body)

  return NextResponse.json({'status' : 200})
}