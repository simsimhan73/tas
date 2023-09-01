'use client'

import { SetStateAction, useState } from "react";

export function Calender() {
	const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [selectDate, setSelectDate] = useState<number>(new Date().getDate());
	const [day, setDay] = useState<number>(new Date().getDay());
	const lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const weekend = ["일", "월", "화", "수", "목", "금", "토"]

	if(typeof window === 'object') {
		document.addEventListener("DOMContentLoaded", function (e) {


			
			let body = document.getElementById("calendar_body") as HTMLTableSectionElement
		
		})
	}

	function MonthChange(changeValue : number) {
		if(month + changeValue > 12) {setYear(year + 1); setMonth(1);}
		else if(month + changeValue < 1) {setYear(year - 1); setMonth(12);}
		else setMonth(month + changeValue)
		setSelectDate(selectDate <= lastDate[month] ? selectDate : 1)
		console.log(new Date(year.toString() + month.toString() + selectDate.toString()).getDay())
	}
	

    return (
        <>
        	<table>
						<tbody id="calendar_body">
							<tr><td>{year + "년"}</td></tr>
							<tr>
							<td>
								<button onClick={(e) => { MonthChange(-1);}}>{month - 1 > 1 ? month - 1 : 12}</button>
							</td>
							<td>{month + "월"}</td>
							<td>
								<button onClick={(e) => { MonthChange(1);}}>{month + 1 < 12 ? month + 1 : 1}</button>
							</td>
							</tr>
							<tr>
								<td>일</td>
								<td>월</td>
								<td>화</td>
								<td>수</td>
								<td>목</td>
								<td>금</td>
								<td>토</td>
							</tr>
							<tr id="date">{[...Array(lastDate[month - 1]).keys()].map(key => key + 1).map((e) => {return (<td key={e}>{e}</td>)})}</tr>
						</tbody>
        	</table>        
        </>
    )
}