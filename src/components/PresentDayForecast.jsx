import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class PresentDayForecast extends Component {
	render() {
		return (
			<>
				{/* <div className='container rounded-5 temp-box'>
					<div className='row'>
						<div className='informations col-12 border border-dark'>
							<p>miasto łódź 30.06.2023 12:12</p>
						</div>
						<div className='col-md-4 info-box border border-dark'>
							temperature
						</div>
						<div className='col-md-4 info-box border border-dark'>image</div>
						<div className='col-md-2 info-box border border-dark'>
							temperature
						</div>
						<div className='col-md-2 info-box border border-dark'>pressure</div>
						<div className='col-md-8 info-box border border-dark'>
							description
						</div>
						<div className='col-md-2 info-box border border-dark'>humidity</div>
						<div className='col-md-2 info-box border border-dark'>
							wind speed
						</div>
					</div>
				</div> */}
				<div className='container rounded-5 temp-box my-5'>
					<div className='row'>
						<div className='col-12 informations '>
							miasto łódź 30.06.2023 12:12
						</div>
						<div className='col-md-4 info-box'>temperature</div>
						<div className='col-md-4 info-box'>image</div>
						<div className='col-md-2 info-box'>feels temperature</div>
						<div className='col-md-2 info-box'>pressure</div>
						<div className='col-md-8 info-box'>description</div>
						<div className='col-md-2 info-box'>humidity</div>
						<div className='col-md-2 info-box'>wind speed</div>
					</div>
				</div>
			</>
		);
	}
}

export default PresentDayForecast;
