import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, NavItem, Navbar } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
	Routes,
} from 'react-router-dom';
import './App.css';
import PresentDayForecast from './components/PresentDayForecast';
import Home from './components/Home';
import FiveDaysForecast from './components/FiveDaysForecast';
import AirPollution from './components/AirPollution';
import Maps from './components/Maps';

function App() {
	return (
		<>
			<header>
				<Navbar className='navbar-dark bg-dark' expand='lg'>
					<Navbar.Brand className='navbar-brand' href='/'>
						<img
							src='./src/assets/meteobrand.png'
							alt='meteo brand'
							className='d-inline-block brand-logo ms-3 me-3'
							width='70'
							height='70'
						/>
						<p className='d-none d-sm-inline-block brand-name'>MeteoNow</p>
					</Navbar.Brand>

					<Navbar.Toggle
						className='me-3'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#mainmenu'
						aria-controls='mainmenu'
						aria-expanded='false'
						aria-label='Przełącznik nawigacji'
					>
						<span className='navbar-toggler-icon'></span>
					</Navbar.Toggle>
					<Navbar.Collapse id='mainmenu'>
						<Nav className='me-auto'>
							<Nav.Item>
								<NavLink
									to='/presentDay'
									className='nav-link'
									activeclassname='active'
								>
									Dziś
								</NavLink>
							</Nav.Item>
							<NavItem>
								<NavLink
									to='/fiveDays'
									className='nav-link'
									activeclassname='active'
								>
									Pięć dni
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									to='/airPollution'
									className='nav-link'
									activeclassname='active'
								>
									Jakość powietrza
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									to='/maps'
									className='nav-link'
									activeclassname='active'
								>
									Mapy
								</NavLink>
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</header>
			<main className='d-flex align-items-center justify-content-center min-vh-100'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/presentDay' element={<PresentDayForecast />} />
					<Route path='/fiveDays' element={<FiveDaysForecast />} />
					<Route path='/airPollution' element={<AirPollution />} />
					<Route path='/maps' element={<Maps />} />
				</Routes>
			</main>
			<footer className='bg-dark text-center text-white fixed-bottom'>
				<p className='author'>Hubert Śmiechowicz 2023</p>
			</footer>
		</>
	);
}

export default App;
