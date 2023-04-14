import React, { useEffect, useState } from "react";
import { getMovies } from "../service/Api.js";
import "../Styles/Movies.css";
import ListTable from "../Utils/ListTable";

const columns = ["Title", "Year", "Category", "Grade"];

const MovieList = ({ searchResults }) => {
	const [movies, setMovies] = useState([]);
	const [showAlert, setShowAlert] = useState(false);


	useEffect(() => {
		if (Array.isArray(searchResults) && searchResults.length) {
			setMovies(searchResults);
		} else {
			const fetchData = async () => {
				try {
					const movies = await getMovies();
					if (movies.length === 0) {
						setShowAlert(true);
					} else {
						setMovies(movies);
					}
				} catch (error) {
					console.error(error);
				}
			};
			fetchData();
		}
	}, [searchResults]);

	const handleAlertClose = () => {
		setShowAlert(false);
	};

	return (
		<div>
			<h2>List of movies</h2>
			{showAlert && (
				<div className='search-bar__alert'>
					<p>No movies found</p>
					<button onClick={handleAlertClose}>Close</button>
				</div>
			)}
			{movies.length > 0 ? (
				<ListTable columns={columns} data={movies} />
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default MovieList;
