import React, { Component, useEffect, useRef, useState } from 'react';
import { Button, Carousel, Dropdown, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function PresentDayForecast() {
	const baseURI = 'https://localhost:7257/';
	const selectRef = useRef(null);
	const dropdownItemRef = useRef(null);
	const simpleForecastRef = useRef(null);
	const currentDay = new Date();

	const [options, setCities] = useState([]);
	const [items, setItems] = useState(['Warszawa']);
	const [simpleForecast, setSimpleForecast] = useState({
		name: '',
		temp: '',
		image: '',
	});
	const [simpleForecastist, setSimpleForecastist] = useState([]);
	const [name, setName] = useState();
	const [temperature, setTemperature] = useState();
	const [image, setImage] = useState();
	const [feelsTemperature, setFeelsTemperature] = useState();
	const [tempMax, setTempMax] = useState();
	const [pressure, setPressure] = useState();
	const [description, setDescription] = useState();
	const [humidity, setHumidity] = useState();
	const [windSpeed, setWindSpeed] = useState();
	const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isAbleToConnectApi, setisAbleToConnectApi] = useState(false);

	const setWeather = (response) => {
		setName(response.data.name);
		setTemperature(response.data.temp);
		setFeelsTemperature(response.data.feelsLike);
		setTempMax(response.data.tempMax);
		setPressure(response.data.pressure);
		setDescription(response.data.description);
		setHumidity(response.data.humidity);
		setWindSpeed(response.data.windSpeed);
		setImage(response.data.image);
	};

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
						console.log(forecastList);
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
				.get(baseURI + 'PresentDayForecast?cityName=' + selectRef.current.value)
				.then((response) => {
					setWeather(response);
				});
		}
	}, []);

	function getCitiesNames() {
		setisAbleToConnectApi(false);
		if (selectRef.current.value && selectRef.current.value.length >= 3) {
			setIsDropdownOpen(true);
			axios
				.get(baseURI + 'Cities?cityNameFragment=' + selectRef.current.value)
				.then((response) => {
					setCities(response.data);
				});
		}
	}

	function getForecast() {
		if (isAbleToConnectApi) {
			axios
				.get(baseURI + 'PresentDayForecast?cityName=' + selectRef.current.value)
				.then((response) => {
					setWeather(response);
				});
		}
	}

	function setSelectRef(value) {
		selectRef.current.value = value;
		setIsDropdownOpen(false);
		setisAbleToConnectApi(true);
	}

	return (
		<>
			<div className='container rounded-5 temp-box'>
				<div className='row'>
					<div className='col-12 my-4 search-city'>
						<Form className='cityFrom d-flex' onChange={getCitiesNames}>
							<div>
								<FormControl
									type='text'
									placeholder='Wpisz nazwę miasta...'
									ref={selectRef}
								/>
								<Dropdown
									show={
										isDropdownOpen &&
										options.length > 0 &&
										selectRef.current.value !== ''
									}>
									<Dropdown.Menu>
										{options.map((options, index) => (
											<Dropdown.Item
												key={index}
												ref={dropdownItemRef}
												onClick={() => setSelectRef(options)}>
												{options}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							</div>
							<Button className='ms-3' variant='light' onClick={getForecast}>
								Wyślij
							</Button>
						</Form>
					</div>
					<div className='col-md-4 informations fs-5'>
						{name} - {currentDay.getDay()}.{currentDay.getMonth() + 1}.
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
