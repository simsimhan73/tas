import { NextRequest, NextResponse } from 'next/server';
import {kv} from '@vercel/kv';
import { promises as fs } from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

let db =  path.join(process.cwd(), 'json');

export async function PUT(
    req : Request
  ) {
    let fileContents = JSON.parse(await fs.readFile(db + '/data.json', 'utf8'));
    try {
      let x = await req.json();
      const year = x.date.slice(0,4)
      const month = x.date.slice(4,6)
      let index = 0;
      for(let fileContent of fileContents) {
        if(fileContent.date == x.date) {
            fileContents[index].content.push(x.content);
            writeFile(db + '/data.json',JSON.stringify(fileContents));
            return NextResponse.json({"status" : 201});
        }
        index++;
      }
      fileContents.push({"date" : x.date, "content" : [x.content]})
      writeFile(db + '/data.json',JSON.stringify(fileContents));

      return NextResponse.json({"status" : 201});
    } catch (err) {
      console.log(err)
    }
  }
  
  export async function DELETE(
    req : Request
  ) {
    let fileContents = JSON.parse(await fs.readFile(db + '/data.json', 'utf8'));
    try{
      let x = await req.json();
      const year = x.date.slice(0,4)
      const month = x.date.slice(4,6)

      let index = 0;
      for(const target of fileContents)
        if(target.date == x.date) {
            let i = 0;
            for(let z of target['content']) {
                if(z == x.content) {
                    fileContents[index].content.splice(i, 1)
                    await writeFile(db + '/data.json',JSON.stringify(fileContents));
                    return NextResponse.json({'status' : 200})
                }
                i++;
            }
            index++;
        }
      return NextResponse.json({'status' : 500})
    } catch (err) {
      console.log(err)
    }
  }