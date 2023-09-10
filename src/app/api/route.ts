import { NextResponse } from 'next/server';
import { writeFileSync, existsSync, writeFile } from 'fs';
import path from 'path';
 
const dir = path.join(process.cwd() , 'db/data.json')

if(!existsSync(dir)) writeFile(dir, "[]", () => {})

export function GET(
  req: Request
) {  
  const data = require(dir);
  
  return NextResponse.json(data);
} 

export function PUT(
  req : Request
) {
  const db = require(dir);

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
  const db = require(dir);

  let find : any = await req.json();

  let i = 0;

  for(let data of db) {
    if(data.date === find.date && data.content === find.content) {
      db.splice(i);
      break;
    }
    i++;
  }

  writeFileSync(dir,JSON.stringify(db));

  return NextResponse.json({'status' : 200})
}