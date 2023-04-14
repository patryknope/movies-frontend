import React, { useState } from "react";
import "../Styles/SearchBar.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	const handleKeyPress = event => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className='search-bar'>
			<input
				type='text'
				placeholder='Search movies...'
				value={searchQuery}
				onChange={event => setSearchQuery(event.target.value)}
				onKeyPress={handleKeyPress}
				className='search-bar__input'
			/>
			<button
				type='button'
				onClick={handleSearch}
				className='search-bar__button'>
				<FontAwesomeIcon icon={faMagnifyingGlass} className='search-ci' />
			</button>
		</div>
	);
};
export default SearchBar;
