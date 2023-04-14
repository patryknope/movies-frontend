import React, { useState } from "react";
import "../Styles/SearchBar.css";

const SearchBar = ({ onSearch, setMovies, searchResults }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const searchMovies = (query, movies) => {
		return movies.filter(
			movie => movie.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	};

	const handleSearch = () => {
		const movies = searchMovies(searchQuery, searchResults || []);
		if (movies.length === 0) {
			window
				.open("", "_blank", "width=300,height=200")
				.document.write("<h1>No movies found</h1>");
		} else {
			setMovies(movies);
		}
	};

	const handleKeyPress = event => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleAlertClose = () => {
		setShowAlert(false);
	};

	return (
		<div className='search-bar'>
			<input
				type='text'
				placeholder='Search movies...'
				value={searchQuery}
				onChange={event => setSearchQuery(event.target.value)}
				onKeyPress={handleKeyPress}
			/>
			{showAlert && (
				<div className='search-bar__alert'>
					<p>No movies found</p>
					<button onClick={handleAlertClose}>Close</button>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
