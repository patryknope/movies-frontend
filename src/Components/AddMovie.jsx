import React from "react";
import AddMovieForm from "./AddMovieForm";
import { addMovie } from "../service/Api.js";

function AddMovie() {
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
		<div>
			<h2>Add a new movie</h2>
			<AddMovieForm onSubmit={handleAddMovie} />
		</div>
	);
}

export default AddMovie;
