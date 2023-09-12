import { NextRequest, NextResponse } from 'next/server';
import {kv} from '@vercel/kv';
import { useRouter } from 'next/router';

const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function GET(request : Request, { params }: { params: { slug: string } }) {  

  try {
    let allDate : number[] = [...Array(lastDate[Number.parseInt(params.slug.slice(4, 6))]).keys()].map(key => key + 1);
    let data = "[";

    for (let i of allDate) {
      data += (await kv.lrange(
        (params.slug.length > 5 ? params.slug : Number.parseInt(params.slug) / 10 * 10 + Number.parseInt(params.slug) % 10).toString()  + (i < 10 ? '0' + i.toString() : i.toString()), 0, -1));
    }
    
    return data ? NextResponse.json(JSON.parse(data + "]")) : NextResponse.json({'status' : 'fail'})
  } catch (err) {
    console.log(err)
  }
} 


