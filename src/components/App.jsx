/* styles */
import '../assets/scss/_App.scss';

/* components */
import Footer from "./Footer"
import Logo from "./Logo"
import AllCharacters from "./AllCharacters"
import SingleCharacter from "./SingleCharacter"

/* dependencies */
import React from 'react';
import { Routes, Route } from 'react-router-dom';


function App() {
	return (
		<>
			<Logo />
			<Routes>
				<Route
					path='/'
					element={<AllCharacters />}
				></Route>
				<Route
					path='/:name'
					element={<SingleCharacter />}
				></Route>
			</Routes>		
			<Footer />
		</>
	);
}

export default App;
