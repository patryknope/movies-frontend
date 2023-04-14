import React, { useEffect, useState } from "react";
import { getMovies } from "../service/Api.js";
import "../Styles/Movies.css";
import ListTable from "../Utils/ListTable";

const columns = ["Title", "Year", "Category", "Grade"];

const MovieList = ({ searchResults }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		if (searchResults.length) {
			setMovies(searchResults);
		} else {
			const fetchData = async () => {
				try {
					const movies = await getMovies();
					setMovies(movies);
				} catch (error) {
					console.error(error);
				}
			};
			fetchData();
		}
	}, [searchResults]);

	return (
		<div>
			<h2>List of movies</h2>
			{movies.length > 0 ? (
				<ListTable columns={columns} data={movies} />
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
export default MovieList;
