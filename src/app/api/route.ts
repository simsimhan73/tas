import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
 
export function GET(
  req: Request
) {  
  const data = require('@/app/db/data.json');
  
  return NextResponse.json(data);
} 

export function PUT(
  req : Request
) {
  const db = require("@/app/db/data.json");

  let json = JSON.stringify(db);
    json = json.replace("[","");
    json = json.replace("]",""); 
  
  let res= req.json()

  res.then((x) => 
  {let result = "[" + json +  (json ? "," : "")+ JSON.stringify(x) + "]"; writeFileSync(process.cwd() + "\\src\\app\\db\\data.json", result);})

  return NextResponse.json({"status" : 201, "url" : "https://simsimhan73.github.io/tas"});
}

export async function DELETE(
  req : Request
) {
  const db = require("@/app/db/data.json");

  let find : any = await req.json();

  let i = 0;

  for(let data of db) {
    if(data.date === find.date && data.content === find.content) {
      db.splice(i);
      break;
    }
    i++;
  }

  writeFileSync(process.cwd() + "\\src\\app\\db\\data.json",JSON.stringify(db));

  return NextResponse.json({'status' : 200})
}