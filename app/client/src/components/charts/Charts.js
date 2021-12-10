import { getCovidData } from 'fetcher';
import { React, useEffect, useState } from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export default function Charts ({state='PA'}) {
	const [dataPoints, setDataPoints] = useState([])
	useEffect(() => {
		getCovidData(state)
		.then(function(data) {
			const res = data.result.results
			data = []
			for (var i = 0; i < res.length; i++) {
				data.push({
					x: new Date(res[i].report_date),
					y: Math.round(res[i].number)
				});
			}
			setDataPoints(data)
		});
	  }, [state])
 
	const options = {
		theme: "light2",
		title: {
			text: "Daily Statistics"
		},
		axisY: {
			title: "Number of New Cases Per Day",
		},
		data: [{
			type: "line",
			xValueFormatString: "YYYY-MM-DD",
			// yValueFormatString: "$#,##0.00",
			dataPoints: dataPoints
		}]
	}
	return (
	<div>
		<CanvasJSChart options = {options} />
		{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
	</div>
	);
}
     