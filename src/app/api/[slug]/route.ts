import { NextRequest, NextResponse } from 'next/server';
import {kv} from '@vercel/kv';
import { useRouter } from 'next/router';

const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function GET(request : Request, { params }: { params: { slug: string } }) {  

  try {

    const year = params.slug.slice(0,4)
    const month = params.slug.slice(4,6)
    let index = 0;

    let allDate : number[] = [...Array(lastDate[Number.parseInt(month)]).keys()].map(key => key + 1);
    let data = "[";

    for (let i of allDate) {
      const date = (i < 10 ? '0' + i.toString() : i.toString())
      const content = await kv.lrange(year + month + date, 0, -1);
      if(content) data += `{date: ${year + month + date}, content: ${content}}`; else continue;
        if(index < allDate.length) {
          data += ','
        }
        i++;
    }
    console.log(data)
    
    return data ? NextResponse.json(JSON.parse(data + "]")) : NextResponse.json({'status' : 'fail'})
  } catch (err) {
    console.log(err)
  }
} 


