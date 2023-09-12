import { NextRequest, NextResponse } from 'next/server';
import {kv} from '@vercel/kv';
import { promises as fs } from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

let db =  path.join(process.cwd(), 'json');

export async function PUT(
    req : Request
  ) {
    const fileContents = JSON.parse(await fs.readFile(db + '/data.json', 'utf8'));
    try {
      let x = await req.json();
      const year = x.date.slice(0,4)
      const month = x.date.slice(4,6)
      for(let fileContent of fileContents) {
        if(fileContent.date == x.date) {
            fileContent.content.push(x.content);
            return NextResponse.json({"status" : 201});
        }
      }
      fileContents.push({"date" : x.date, "content" : [x.content]})
      writeFile(db + '/data.json',fileContents);

      return NextResponse.json({"status" : 201});
    } catch (err) {
      console.log(err)
    }
  }
  
  export async function DELETE(
    req : Request
  ) {
    const fileContents = JSON.parse(await fs.readFile(db + '/data.json', 'utf8'));
    try{
      let x = await req.json();
      const year = x.date.slice(0,4)
      const month = x.date.slice(4,6)
      for(const target of fileContents)
        if(target.date == x.date) {
            let i =0;
            for(let z in target) {
                if(z == x.content) {
                    target.splice(i)
                    return NextResponse.json({'status' : 200})
                }
                i++;
            }
        }
      writeFile(db + '/data.json',fileContents);
      return NextResponse.json({'status' : 200})
    } catch (err) {
      console.log(err)
    }
  }