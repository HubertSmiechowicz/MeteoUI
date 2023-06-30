import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
	Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import PresentDayForecast from './PresentDayForecast';

class Home extends Component {
	render() {
		return (
			<>
				<main>
					<div className='container'>
						<div className='col-12 d-flex align-items-center flex-column'>
							<div className='d-flex'>
								<h1 className='display-1 mb-5'>Witaj w MeteoNow</h1>
								<img
									src='./src/assets/meteobrand.png'
									alt='meteo brand'
									width='100px'
									height='100px'
									className='rounded-circle d-none d-md-inline-block'
								/>
							</div>
							<p className='lead'>
								Dzięki nam możesz sprawdzić prognozę pogody dla wielu miejsc na
								świecie. Interesuje cię temperatura, ciśnienie atmosferyczne,
								wilgotność a może to jak silny będzie wiatr? U nas znajdziesz to
								wszystko nie tylko na dziś, ale również na jutro, tydzień czy
								nawet cały miesiąc. Nie zwlekaj i sprawdź pogodę na:
							</p>
							<Link
								className='text-decoration-none fs-1 text-uppercase fw-light text-dark p-2 border border-2 border-dark rounded-pill'
								to={'/presentDay'}>
								Dziś
							</Link>
						</div>
					</div>
					<Routes>
						<Route path='/presentDay' element={<PresentDayForecast />} />
					</Routes>
				</main>
			</>
		);
	}
}

export default Home;
