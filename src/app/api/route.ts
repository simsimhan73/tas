import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
 
interface scheduleType {
    year : number,
    month : number,
    date : number,
    content : string
  }
 

  
export function GET(
  req: Request
) {  
  const datas = require('@/app/db/data.json')
  
  return NextResponse.json(datas)
} 