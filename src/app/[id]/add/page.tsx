'use client'

import { useState } from "react";


type ReadProps = {
    params: {
      id: string;
    };
  };
  export default function Read(props: ReadProps) {
    const [data, setData] = useState<string | null>("");

    function add() {
    }

    return (
      <>
        <label style={{'display' : 'block'}}>추가할 이벤트 입력</label>
        <input onChange={(e) => {setData(e.currentTarget.value)}}/>
        <button>추가</button>
      </>
    );
  } 