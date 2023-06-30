import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class PresentDayForecast extends Component {
	render() {
		return (
			<>
				<div className='container rounded-5 temp-box'>
					<div className='row'>
						<div className='informations col-12'>
							<p>miasto łódź 30.06.2023 12:12</p>
						</div>
						<div className='col-md-6 container'>
							<div className='row'>
								<div className='col-md-6 info-box border'>temperature</div>
								<div className='col-md-6 info-box border'>image</div>
								<div className='col-12 info-box border'>description</div>
							</div>
						</div>
						<div className='col-md-6 container'>
							<div className='row'>
								<div className='col-md-6 info-box border'>temperature</div>
								<div className='col-md-6 info-box border'>pressure</div>
								<div className='col-md-6 info-box border'>humidity</div>
								<div className='col-md-6 info-box border'>wind speed</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default PresentDayForecast;
