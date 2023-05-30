import React, { useEffect, useState } from "react";
import "../Styles/Movies.css";
import ListTable from "../Utils/ListTable";
import Pagination from "../Utils/Pagination";
import { getMovies, getMyMovies } from "../service/Api.js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth
} from "./../firebase";
import { Switch, useLocation } from 'react-router-dom'

const columns = ["Title", "Year", "Category", "Grade"];

const MovieList = ({ searchResults, setSearchResults}) => {
	const [page, setPage] = useState(1);
	const [movies, setMovies] = useState({ content: [], totalPages: 0 });
	const [error, setError] = useState(null);
	const [user, loading, error2] = useAuthState(auth);
	const [upd, setUpd] = useState(0)

	let location = useLocation();

	function onPageChange(newPage) {
		if (typeof newPage === "number" && !isNaN(newPage)) {
			setPage(newPage);
		}
	}

	const fetchData = async () => {
		try {
			const pageNumber = isNaN(page) ? 0 : page - 1;
			const response = location.pathname === '/mymovies' ? await getMyMovies({ page: pageNumber, email: user.email}) : await getMovies({ page: pageNumber});
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

	}, [user, loading, location.pathname, page, searchResults]);

	if (error) {
		return <div>An error occurred: {error.message}</div>;
	}

	return (
		<div className='movie-list-container'>
			<h2>{location.pathname === '/mymovies' ? 'My movies' : 'All movies' }</h2>
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
				<ListTable columns={columns} data={movies.content} upd={setUpd} />
			) : (
				<p>No movies</p>
			)}
		</div>
	);
};

export default MovieList;
