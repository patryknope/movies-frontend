import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./Components/MovieList";
import AddMovie from "./Components/AddMovieForm";
import Header from "./Components/Header";
import { searchMovies } from "./service/Api";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	function handleSearch(query) {
		setSearchQuery(query);
		if (query) {
			searchMovies(query).then(data => {
				setSearchResults(data);
			});
		} else {
			setSearchResults([]);
		}
	}

	function handleAddMovie(data) {
		console.log(data);
	}

	return (
		<Router>
			<div>
				<Header onSearch={handleSearch} />
				<Routes>
					<Route
						path='/'
						element={<MovieList searchResults={searchResults} />}
					/>
					<Route
						path='/addmovie'
						element={<AddMovie onSubmit={handleAddMovie} />}
					/>
					<Route
						path='/movies'
						element={<MovieList searchResults={searchResults} />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
