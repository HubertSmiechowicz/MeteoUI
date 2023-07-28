import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navigation from './components/Navigation';
import BasePage from './components/BasePage';
import Home from './components/Home';

function App() {
	const location = new useLocation();
	const isHomeActive = location.pathname === '/';

	return (
		<>
			<header>
				<Navigation />
			</header>
			<main className='d-flex align-items-center justify-content-center min-vh-100'>
				{isHomeActive ? null : <BasePage />}
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</main>
			<footer className='bg-dark text-center text-white fixed-bottom'>
				<p className='author'>Hubert Śmiechowicz 2023</p>
			</footer>
		</>
	);
}

export default App;
