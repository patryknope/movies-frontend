import React, { useState } from "react";
import { searchMovies, addMovie } from "../service/Api";
import MovieList from "../Components/MovieList";
import Header from "../Components/Header";
import AddMovieForm from "../Components/AddMovieForm";

function MoviePage() {
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
		<>
			<Header onSearch={handleSearch} />
			<MovieList
				searchResults={searchResults}
				setSearchResults={setSearchResults}
			/>
			<AddMovieForm onSubmit={handleAddMovie} />
		</>
	);
}

export default MoviePage;
