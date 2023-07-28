import React, { useContext, useEffect } from 'react';
import { InputContext } from './BasePage';
import axios from 'axios';

function FiveDaysForecast() {
	const baseURI = 'https://localhost:7257/';
	const { selectRef } = useContext(InputContext);

	useEffect(() => {
		if (selectRef.current.value == '') {
			axios
				.get(baseURI + 'FiveDaysForecast?cityName=Warszawa')
				.then((response) => {
					console.log(response);
				});
		} else {
			axios
				.get(baseURI + 'FiveDaysForecast?cityName=' + selectRef)
				.then((response) => {
					console.log(response);
				});
		}
	}, []);

	return (
		<>
			<h1>Five Days Forecast!!!</h1>
			<p>Sorry!!! Work in progress... :/</p>
		</>
	);
}

export default FiveDaysForecast;
