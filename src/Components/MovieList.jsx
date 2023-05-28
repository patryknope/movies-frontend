import React, { useEffect, useState } from "react";
import "../Styles/Movies.css";
import ListTable from "../Utils/ListTable";
import Pagination from "../Utils/Pagination";
import { getMovies } from "../service/Api.js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth
} from "./../firebase";

const columns = ["Title", "Year", "Category", "Grade"];

const MovieList = ({ searchResults, setSearchResults }) => {
	const [page, setPage] = useState(1);
	const [movies, setMovies] = useState({ content: [], totalPages: 0 });
	const [error, setError] = useState(null);
	const [user, loading, error2] = useAuthState(auth);

	function onPageChange(newPage) {
		if (typeof newPage === "number" && !isNaN(newPage)) {
			setPage(newPage);
		}
	}

	const fetchData = async () => {
		try {
			const pageNumber = isNaN(page) ? 0 : page - 1;
			const response = await getMovies({ page: pageNumber, email: user.email});
			console.log("Received data:", response);
			setMovies(prevMovies => {
				return {
					...prevMovies,
					content: response.content,
					totalPages: response.totalPages,
				};
			});
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if(loading) return;
		if(user) {
			if (
				searchResults &&
				searchResults.content &&
				searchResults.content.length > 0
			) {
				setMovies(searchResults);
			} else {
				fetchData();
			}
		}
	}, [user, loading]);

	if (error) {
		return <div>An error occurred: {error.message}</div>;
	}

	return (
		<div className='movie-list-container'>
			<h2>List of movies</h2>
			<div className='pagination-container'>
				<Pagination
					currentPage={page}
					totalPages={movies?.totalPages || 0}
					onPageChange={onPageChange}
					color='primary'
					size='large'
					showFirstButton
					showLastButton
					className='pagination'
				/>
			</div>
			{movies && movies.content && movies.content.length > 0  && user ? (
				<ListTable columns={columns} data={movies.content} />
			) : (
				<p>No movies</p>
			)}
		</div>
	);
};

export default MovieList;
