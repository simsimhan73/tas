import { NextResponse } from 'next/server';
import { writeFileSync, existsSync, writeFile } from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';
 
const dir = path.join(process.cwd() , 'db/data.json')

if(!existsSync(dir)) writeFile(dir, "[]", () => {})

export function GET(
  req: Request
) {  
  readFile(dir, 'utf-8').then((x) => {return NextResponse.json(JSON.parse(x))}).catch(() => {return NextResponse.json({'message' : 'error'})});
  
} 

export function PUT(
  req : Request
) {
  const db = readFile(dir);

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