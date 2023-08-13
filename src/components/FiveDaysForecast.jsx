import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputContext } from './BasePage';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import ChartAnnotation from 'chartjs-plugin-annotation';
import axios from 'axios';

function FiveDaysForecast() {
	const baseURI = 'https://localhost:7257/';
	const {
		selectRef,
		setTemperatures,
		setDays,
		temperatures,
		days,
		cityName,
		setCityName,
		fiveDayImage,
		setFiveDayImage,
	} = useContext(InputContext);

	Chart.register(ChartDataLabels);
	Chart.register(ChartAnnotation);

	useEffect(() => {
		if (selectRef.current.value == '') {
			axios
				.get(baseURI + 'FiveDaysForecast?cityName=Warszawa')
				.then((response) => {
					const daysFromData = [''];
					const temperatureFromData = [null];
					const imagesFromData = [''];
					response.data.forecastDtos.forEach((element) => {
						daysFromData.push(element.dt);
						const temperature = parseFloat(element.temp);
						temperatureFromData.push(temperature);
						imagesFromData.push(element.image);
					});
					daysFromData.push('');
					temperatureFromData.push(null);
					imagesFromData.push('');
					setDays(daysFromData);
					setTemperatures(temperatureFromData);
					setFiveDayImage(imagesFromData);
					setCityName(response.data.name);
					console.log(response);
				});
		}
	}, [selectRef, setDays, setTemperatures]);

	const data = {
		labels: days,
		datasets: [
			{
				data: temperatures,
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				font: {
					size: 24,
				},
				text: 'Prognoza pogody dla ' + cityName,
			},
			legend: {
				display: false,
			},
			annotation: {
				drawTime: 'afterDatasetsDraw',
				annotations: temperatures.map((value, index) => ({
					type: 'label',
					content: function () {
						const imageSrc = fiveDayImage[index];
						const image = new Image();
						image.src = imageSrc;
						image.width = 100;
						image.height = 100;
						return image;
					},
					xValue: index,
					yValue: value - 20,
					enabled: true,
					borderWidth: 0,
				})),
			},
			datalabels: {
				render: 'image',
				font: {
					size: 24,
				},
				color: 'black',
				anchor: 'end',
				offset: 50,
				align: 'start',
				formatter: function (value, context) {
					return [value + '°C'];
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 15,
					},
				},
			},
			y: {
				max: 40,
				grid: {
					display: false,
				},
				ticks: {
					stepSize: 10,
					font: {
						size: 15,
					},
				},
			},
		},
	};

	return (
		<>
			<div className='chart-container'>
				<Line data={data} options={options} />
			</div>
		</>
	);
}

export default FiveDaysForecast;
