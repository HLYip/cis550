import { getCovidData } from 'fetcher';
import { React, useEffect, useState } from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export default function CountyChart ({
	title='Daily Statistics',
	yAxis='Number of New Cases Per Day',
	dataPoints
}) {
	const options = {
		theme: "light2",
		title: {
			text: title
		},
		axisY: {
			title: yAxis,
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
     