import React, { createContext, useRef, useState } from 'react';
import axios from 'axios';
import { Form, FormControl, Dropdown, Button } from 'react-bootstrap';
import PagesRouter from './PagesRouter';
import { useLocation } from 'react-router-dom';

export const InputContext = createContext();

function BasePage() {
	const baseURI = 'https://localhost:7257/';
	const selectRef = useRef(null);
	const [options, setCities] = useState([]);
	const dropdownItemRef = useRef(null);
	const location = useLocation();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isAbleToConnectApi, setisAbleToConnectApi] = useState(false);

	const [name, setName] = useState();
	const [temperature, setTemperature] = useState();
	const [image, setImage] = useState();
	const [feelsTemperature, setFeelsTemperature] = useState();
	const [tempMax, setTempMax] = useState();
	const [pressure, setPressure] = useState();
	const [description, setDescription] = useState();
	const [humidity, setHumidity] = useState();
	const [windSpeed, setWindSpeed] = useState();

	function setSelectRef(value) {
		selectRef.current.value = value;
		setIsDropdownOpen(false);
		setisAbleToConnectApi(true);
	}

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
		if (isAbleToConnectApi && location.pathname === '/presentDay') {
			axios
				.get(baseURI + 'PresentDayForecast?cityName=' + selectRef.current.value)
				.then((response) => {
					setWeather(response);
					selectRef.current.value = '';
				});
		} else if (isAbleToConnectApi && location.pathname === '/fiveDays') {
			axios
				.get(baseURI + 'FiveDaysForecast?cityName=' + selectRef.current.value)
				.then((response) => {
					console.log(response);
					selectRef.current.value = '';
				});
		}
	}

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

	return (
		<>
			<div className='temp-box rounded-5'>
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
				<InputContext.Provider
					value={{
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
					}}>
					<PagesRouter />
				</InputContext.Provider>
			</div>
		</>
	);
}

export default BasePage;
