'use client'

import Link from "next/link";
import { useState } from "react";

const apiUrl = 'http://tas.simsim-han.com/api'

type ReadProps = {
    params: {
      id: string;
    };
  };
  export default function Read(props: ReadProps) {
    const [data, setData] = useState<string | null>("");

    async function add() {
      let res = await fetch(apiUrl, {method : "PUT", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({"date" : props.params.id, "content" : data})});

      return res;
      
    }

    return (
      <>
        <label style={{'display' : 'block'}}>추가할 이벤트 입력</label>
        <input onChange={(e) => {setData(e.currentTarget.value)}}/>
        <Link onClick={() => add()} href="/" style={{"border" : '1px solid white', 'borderRadius' : '5px', 'margin' : '10px'}}>추가</Link>
      </>
    );
  } 