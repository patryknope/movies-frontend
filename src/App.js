import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./Components/MovieList";
import AddMovie from "./Components/AddMovieForm";
import Header from "./Components/Header";
import { searchMovies, addMovie } from "./service/Api";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState({
		content: [],
		totalPages: 0,
	});

	function handleSearch(query) {
		setSearchQuery(query);
		if (query) {
			searchMovies(query).then(data => {
				setSearchResults(data);
			});
		} else {
			setSearchResults({ content: [], totalPages: 0 });
		}
	}

	async function handleAddMovie(data) {
		console.log(data);
		try {
			const addedMovie = await addMovie(data);
			console.log("Added movie:", addedMovie);
		} catch (error) {
			console.error("Failed to add movie:", error);
		}
	}

	return (
		<Router>
			<div>
				<Header onSearch={handleSearch} />
				<Routes>
					<Route
						path='/'
						element={
							<MovieList
								searchResults={searchResults}
								setSearchResults={setSearchResults}
							/>
						}
					/>
					<Route
						path='/addmovie'
						element={<AddMovie onSubmit={handleAddMovie} />}
					/>
					<Route
						path='/movies'
						element={
							<MovieList
								searchResults={searchResults}
								setSearchResults={setSearchResults}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
