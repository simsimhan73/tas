import { NextResponse } from 'next/server';
import { writeFileSync, existsSync, writeFile } from 'fs';
import path from 'path';
import {kv} from '@vercel/kv';
 
const dir = path.join(process.cwd() , 'db/data.json')

if(!existsSync(dir)) writeFile(dir, "[]", () => {})

export async function GET(
  req: Request
) {  
  let data = await kv.get('tas');
  
  return data ? NextResponse.json(data) : NextResponse.json({'status' : 'fail'})
} 

export async function PUT(
  req : Request
) {
  let db = await kv.get('tas');

  
  let json = JSON.stringify(db);
    json = json.replace("[","");
    json = json.replace("]",""); 
  
  let res= req.json()

  res.then((x) => 
  {let result = "[" + json +  (json ? "," : "")+ JSON.stringify(x) + "]"; writeFileSync(dir, result);})

  return NextResponse.json({"status" : 201});
}

export async function DELETE(
  req : Request
) {
  const db : Array<{date : string, content : string}> | null = await kv.get('tas');

  let find : any = await req.json();

  let i = 0;

  if(!db) return;

  for(let data of db) {
    if(data.date === find.date && data.content === find.content) {
      db.splice(i);
      break;
    }
    i++;
  }

  kv.set(dir,JSON.stringify(db));

  return NextResponse.json({'status' : 200})
}