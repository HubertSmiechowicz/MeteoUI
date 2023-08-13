import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { InputContext } from './BasePage';

function PresentDayForecast() {
	const baseURI = 'https://localhost:7257/';
	const {
		selectRef,
		setWeather,
		name,
		temperature,
		image,
		feelsTemperature,
		tempMax,
		pressure,
		description,
		humidity,
		windSpeed,
	} = useContext(InputContext);
	const currentDay = new Date();
	const [items, setItems] = useState(['Warszawa']);
	const [simpleForecast, setSimpleForecast] = useState({
		name: '',
		temp: '',
		image: '',
	});
	const [simpleForecastist, setSimpleForecastist] = useState([]);
	const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);

	useEffect(() => {
		axios.get(baseURI + 'Cities/main').then((response) => {
			setItems(response.data);
			setIsInitialDataFetched(true);
		});
	}, []);

	useEffect(() => {
		const forecastList = [];
		const params = () => {
			let string = '';
			items.forEach((element) => {
				string += 'cityNames=' + element + '&';
			});
			return string;
		};

		if (isInitialDataFetched) {
			axios
				.get(baseURI + 'PresentDayForecast/cities?' + params())
				.then((response) => {
					response.data.forEach((element) => {
						const newForecast = {
							name: element.name,
							temp: element.temp,
							image: element.image,
						};
						setSimpleForecast(newForecast);
						forecastList.push(newForecast);
					});
				});
		}
		setSimpleForecastist(forecastList);
	}, [isInitialDataFetched]);

	useEffect(() => {
		if (selectRef.current.value == '') {
			axios
				.get(baseURI + 'PresentDayForecast?cityName=Warszawa')
				.then((response) => {
					setWeather(response);
				});
		} else {
			axios
				.get(baseURI + 'PresentDayForecast?cityName=' + selectRef)
				.then((response) => {
					setWeather(response);
				});
		}
	}, []);

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-md-4 informations fs-5'>
						{name} - {currentDay.getDate()}.{currentDay.getMonth() + 1}.
						{currentDay.getFullYear()} {currentDay.getHours()}:
						{currentDay.getMinutes()}
					</div>
					<Carousel
						indicators={false}
						id='carouselExampleControls'
						className='col-md-8 d-none d-md-inline-block text-center weather-slider rounded-5'
						data-ride='carousel'>
						{simpleForecastist.map((simpleForecastist, index) => (
							<Carousel.Item
								className='slider-item'
								key={index}
								onClick={() => {
									axios
										.get(
											baseURI +
												'PresentDayForecast?cityName=' +
												simpleForecastist.name
										)
										.then((response) => {
											setWeather(response);
										});
								}}>
								<div className='d-flex justify-content-center fs-5'>
									<p className='me-3 mt-2'>{simpleForecastist.name}</p>
									<p className='me-3 mt-2'>{simpleForecastist.temp}°C</p>
									<img
										src={simpleForecastist.image}
										alt='zdjęcie prezentujące pogodę'
										className='img-slider'
									/>
								</div>
							</Carousel.Item>
						))}
					</Carousel>
					<div className='col-md-6 info-box d-flex align-items-center justify-content-center fs-1'>
						{temperature}°C
						<img
							src={image}
							alt='zdjęcie prezentujące pogodę'
							className='ikon-weather mx-4'
						/>
					</div>
					<div className='col-md-3 info-box d-flex align-items-center justify-content-center flex-column'>
						<p className='text-center2fs-5'>Temp. odczuwalna</p>
						<p className='fs-2'>{feelsTemperature}°C</p>
					</div>
					<div className='col-md-3 info-box d-flex align-items-center justify-content-center flex-column'>
						<p className='fs-5'>Ciśnienie</p>
						<p className='fs-2'>{pressure} hPa</p>
					</div>
					<div className='col-md-6 info-box d-flex align-items-center justify-content-center'>
						<p className='fs-4'>
							<span className='capitalize'>{description}</span>. Maksymalna
							temperatura dziś osiągnie {tempMax}°C
						</p>
					</div>
					<div className='col-md-3 info-box d-flex align-items-center justify-content-center flex-column '>
						<p className='fs-5'>Wilgotność</p>
						<p className='fs-2'>{humidity} %</p>
					</div>
					<div className='col-md-3 info-box d-flex align-items-center justify-content-center flex-column'>
						<p className='fs-5'>Prędkość wiatru</p>
						<p className='fs-2'>{windSpeed} m/s</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default PresentDayForecast;
