import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PresentDayForecast from './PresentDayForecast'
import Home from './Home';
import FiveDaysForecast from './FiveDaysForecast';
import AirPollution from './AirPollution';
import Maps from './Maps';
import { InputContext } from './BasePage';

function PagesRouter() {

    const inputRefContext = useContext(InputContext)

	return (
		<>
			<Routes>
				<Route path='/presentDay' element={<PresentDayForecast inputRef={inputRefContext}  />} />
				<Route path='/fiveDays' element={<FiveDaysForecast />} />
				<Route path='/airPollution' element={<AirPollution />} />
				<Route path='/maps' element={<Maps />} />
			</Routes>
		</>
	);
}

export default PagesRouter;
