import React from "react";
import AddMovieForm from "./AddMovieForm";
import { addMovie } from "../service/api";

function AddMovie() {
	const handleAddMovie = async data => {
		console.log("AddMovie called with data:", data);
		try {
			const response = await addMovie(data);
			console.log("AddMovie response:", response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Add a new movie</h2>
			<AddMovieForm onSubmit={handleAddMovie} />
		</div>
	);
}

export default AddMovie;
