import { NextRequest, NextResponse } from 'next/server';
import {kv} from '@vercel/kv';
import { useRouter } from 'next/router';

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