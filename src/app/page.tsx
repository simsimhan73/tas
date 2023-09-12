'use client'

import Image from 'next/image'
import styles from './page.module.css'
import React, { useEffect } from "react";
import { useState } from "react";
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Home() {
	const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [selectDate, setSelectDate] = useState<number>(new Date().getDate());
	const [day, setDay] = useState<number>(new Date().getDay());
	const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [schedule, setSchedule] = useState<Array<scheduleType>>()

  useEffect(() => {init(lastDate[month]).then();}, [month])

	function getFirstDay() : number {
		return new Date(year.toString() + "-" + (month < 10 ? "0" + month.toString() : month.toString()) + "-01").getDay()
	}


	function MonthChange(changeValue : number) {
		if(month + changeValue > 12) {setYear(year + 1); setMonth(1);}
		else if(month + changeValue < 1) {setYear(year - 1); setMonth(12);}
		else setMonth(month + changeValue)
		setSelectDate(selectDate <= lastDate[month] ? selectDate : 1)
		
	}

	let calendar: number[][] = Array.from(Array(5), () => Array(7).fill(0))

	function MakeCalendar() {
		let allDate : number[] = [...Array(lastDate[month - 1]).keys()].map(key => key + 1);
		const firstDay = getFirstDay();
		let week = 0;
		for (let date of allDate) {
			if((date + firstDay - 1) % 7 === 0 && week < 4 && date != 1) {calendar.push(); week++;}
			calendar[week][(date + firstDay - 1) % 7] = date;	
    }
	}

  function weekend(k : number) {
    if (k % 7 === 6)
      return {'color' : 'blue', 'borderColor' : 'blue'}
    if(k % 7 === 0)
      return {'color' : 'red', 'borderColor' : 'red'}
  }

	MakeCalendar()	

  async function init(m : number) {
    const res = await (await fetch(`https://tas.vercel.app/api/${year}${(month < 10 ? '0' + month : month)}`, {method : "GET"})).json()
    let arr : Array<scheduleType> = new Array();

    for(let data of res) {
      let _year, _month, _date;
      _year = Number.parseInt(data.date.splice(0,4))
      _month = Number.parseInt(data.date.splice(4,6))
      _date = Number.parseInt(data.date.splice(6,8))
      let x : scheduleType = { year : _year, month : _month, date: _date , content: data["content"]}
      arr.push(x);
    }

    setSchedule(arr);
  }

  function find(date : number) : Array<React.JSX.Element> | undefined {
    if(!schedule || !date) return;

    let result : Array<React.JSX.Element> = new Array();

    let z = year.toString() + (month < 10 ? "0" + month.toString() : month.toString()) + (date< 10 ? "0" + date.toString() : date.toString())

    for(let i of schedule)
    {
      if(year === i.year && month === i.month && date === i.date) result.push((<label key={i.content} className=
        {styles.month_button} style={{'display' : 'block'}} onClick={(e) => remove(z, i.content)}>{i.content}</label>));
    }
    return result;
  }

  function remove(c : string, content : string) {
    fetch('https://tas.vercel.app/api', {method : 'DELETE', headers: {"Content-Type" : "application/json"}, body : JSON.stringify({"date" : c, "content" : content})})
    location.reload();
  }

    return (
        <table>
					<tbody className={styles.table}>
						<tr>
              <td/>
              <td/>
              <td/>
              <td className={styles.year}>{year + "년"}</td>
              <td/>
              <td/>
              <td/>
              </tr>
						<tr>
              <td/>
              <td/>
              <td className={styles.month_button} onClick={(e) => { MonthChange(-1);}}>{month - 1 > 1 ? month - 1 : 12}</td>
              <td className={styles.month}>{month + "월"}</td>
              <td className={styles.month_button} onClick={(e) => { MonthChange(1);}}>{month + 1 < 12 ? month + 1 : 1}</td>
              <td/>
              <td/>
						</tr>
						<tr>
							<td style={{color : 'red'}}>일</td>
							<td>월</td>
							<td>화</td>	
							<td>수</td>
							<td>목</td>
							<td>금</td>
							<td style={{color : 'blue'}}>토</td>
						</tr>
						{calendar.map((row, i) => (<tr key={year.toString() + month.toString() + (i + 1).toString() + "주"}>
							{row.map((value, k) => (<td className={styles.date} key={k} style={weekend(k)}>
                {value ? value : ""}{value ? <Link className={styles.month_button} href=
                {'add/' +year.toString() + (month < 10 ? "0" + month.toString() : month.toString()) + (value < 10 ? "0" + value.toString() : value.toString())}>일정 추가</Link> : ""}
                {find(value) ? find(value)?.map((x) => x) : ""}
                </td>
							))}
						</tr>))}
						</tbody>
        </table>        
    )
}

interface scheduleType {
  year : number,
  month : number,
  date : number,
  content : string
}