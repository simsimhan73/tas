import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let db =  path.join(process.cwd(), 'json');

export async function GET(request : Request, { params }: { params: { slug: string } }) {  
  const fileContents = JSON.parse(await fs.readFile(db + '/data.json', 'utf8'));
  try {    
    return NextResponse.json(fileContents)
  } catch (err) {
    console.log(err)
  }
} 
